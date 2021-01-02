import React, { Component } from "react";
import ScoreboardDataService from "../services/scoreboard.service";
import PlayerDataService from "../services/player.service";
import { Link } from "react-router-dom";

export default class ScoreboardSingle extends Component {
  constructor(props) {
    super(props);
    this.retrievePlayers = this.retrievePlayers.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.state = {
      playersInGame: [],
      playersNotInGame: []
    };
  }

  componentDidMount() {
      this.retrievePlayers(this.props.match.params.id)
  }

  retrievePlayers(id) {
    ScoreboardDataService.get(id)
      .then(scoreboard => {
        PlayerDataService.getAll().then(resp => {
          var playersInGame = []
          var playersNotInGame = []
          resp.data.forEach( player => {
            var inGame = false 
            scoreboard.data.players.forEach( pig => {
              if (pig.player_id === player.id) { 
                inGame = true
              }
            })
            if (inGame) { 
              playersInGame.push({
                name: player.name,
                id: player.id,
                score: 0
              })
            }
            else {
              playersNotInGame.push(player)
            }
          })
          this.setState({
            playersInGame: playersInGame,
            playersNotInGame: playersNotInGame
          })

        })
      })
      .catch(e => {
        console.log(e);
      });
  }

  addPlayer(pid) { 
    var playersInGame = this.state.playersInGame;
    var playersNotInGame = this.state.playersNotInGame;

    PlayerDataService.get(pid).then(player => {
      console.log(player)
      var pName = player.data.name
      var newPlayer = {
        id: pid,
        player_id: pid,
        name: pName,
        score: 0
      }
      playersInGame.push(newPlayer)
      playersNotInGame = playersNotInGame.filter( pnig => {
        return pnig.id !== pid
      })
      ScoreboardDataService.addPlayer(this.props.match.params.id, pid)

      this.setState({
        playersInGame: playersInGame,
        playersNotInGame: playersNotInGame
      })
    })
    
  }

  remPlayer(pid) { 
    ScoreboardDataService.remPlayer(this.props.match.params.id, pid).then((response) => {
      ScoreboardDataService.get(this.props.match.params.id).then((res) => {
        PlayerDataService.get(pid).then((removedPlayer) => {
          console.log(removedPlayer)
          var playersNotInGame = this.state.playersNotInGame;
          playersNotInGame.push({
            id: pid,
            name: removedPlayer.data.name
          })
          this.setState({
            playersNotInGame: playersNotInGame,
            playersInGame: res.data.players
          })
        })
        
      })
    })
  }
  refreshList() {
    this.retrievePlayers(this.props.match.params.id);
  }

  render() {
    return (
      <div className="list">
        <h4>Players in Game</h4>
        <ul className="list-unstyled">{this.state.playersInGame.map(p => <li>{p.name} <button
        onClick={() => this.remPlayer(p.id)}
        className="btn btn-danger">
            Remove
       </button> </li> )}</ul>
        <h4>Players NOT in Game</h4>
        <ul className="list-unstyled">{this.state.playersNotInGame.map(p => <li>{p.name} <button
        onClick={() => this.addPlayer(p.id)}
        className="btn btn-success">
            Add to Game
       </button> </li>)} </ul>
        
        <Link to={"/scoreboards/info/" + this.props.match.params.id} className="btn btn-info">Back</Link>
      </div>
    );
  }
}
