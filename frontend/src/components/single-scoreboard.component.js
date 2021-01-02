import React, { Component } from "react";
import ScoreboardDataService from "../services/scoreboard.service";
import { Link } from "react-router-dom";

export default class ScoreboardSingle extends Component {
  constructor(props) {
    super(props);
    this.retrieveScoreboard = this.retrieveScoreboard.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.StateChangeButton = this.StateChangeButton.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.PlayersChangeButton = this.PlayersChangeButton.bind(this);

    this.state = {
      name: "",
      description: "",
      started_at: "1970-01-01T00:01:00Z",
      ended_at: "1970-01-01T00:01:00Z",
      createdAt: "1970-01-01T00:01:00Z",
      updatedAt: "1970-01-01T00:01:00Z",
      id: ""
    };
  }

    componentDidMount() {
        this.retrieveScoreboard(this.props.match.params.id)
    }


  retrieveScoreboard(id) {
    ScoreboardDataService.get(id)
      .then(response => {
        var startDate = new Date(response.data.started_at)
        var endDate = new Date(response.data.ended_at)

        var started_at_normalized = startDate.getMonth()+1 + "-" + startDate.getDate() + "-" + startDate.getFullYear()
        var ended_at_normalized = endDate.getMonth()+1 + "-" + endDate.getDate() + "-" + endDate.getFullYear()

        if (response.data.started_at == "1970-01-01T00:00:00.000Z") { 
            var started = false;
        }
        else {
            var started = true;
        }

        if (endDate == "" || response.data.ended_at == "1970-01-01T00:00:00.000Z") { 
            var finished = false;
        }
        else {
            var finished = true;
        }

        if (started && !finished) { 
            var inProgress = true;
        }
        else {
            var inProgress = false;
        }

        if (started && !finished) { 
            var timestampText = "Game In Progress :: Started at " + started_at_normalized
        }
        else if (finished) { 
            var timestampText = "Game Finished :: Finished at " + ended_at_normalized
        }
        else { 
            var timestampText = "Game Scheduled"
        }

        this.setState({
          name: response.data.name,
          description: response.data.description,
          started_at: response.data.started_at,
          ended_at: response.data.ended_at,
          started_at_real: started_at_normalized,
          ended_at_real: ended_at_normalized,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          started: started,
          finished: finished,
          inProgress: inProgress,
          timestamp: timestampText,
          id: id
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveScoreboard(this.props.match.params.id);
  }

  StateChangeButton(e) { 
      if (this.state.started && !this.state.finished) {
        return <button
        onClick={this.endGame}
        className="btn btn-danger">
            End Game
       </button>
      }
      if (!this.state.started) { 
        return <button
         onClick={this.startGame}
         className="btn btn-success">
             Start Game
        </button>
      }
      if (this.state.finished) { 
          return <button
          className="btn btn-secondary">
            Game Ended
          </button>
      }
  }

  PlayersChangeButton(e) { 
      if (!this.state.started) { 
        return <Link to={"/scoreboards/players/" + this.state.id} className="btn btn-success">Edit</Link>
      }
      else {
        return <button
        className="btn btn-secondary">
            Locked
       </button>
      }
      
  }

  startGame() {
    ScoreboardDataService.start(
        this.state.id
    ).then(response => {
        this.setState({
            started: true,
            inProgress: true,
            started_at: response.data.game.started_at
        })
        this.refreshList()
    })
  }

  endGame() { 
    ScoreboardDataService.end(
        this.state.id
    ).then(response => {
        this.setState({
            finished: true,
            inProgress: false,
            ended_at: response.data.game.ended_at
        })
        this.refreshList()
    })
  }

  render() {
    return (
      <div className="list row">
        <div className="col-md-6">
          <h4 class="">{this.state.name}</h4>
          <h5>{this.state.description}</h5>
          {this.state.timestamp}  
        </div>
        <div className="col-md-6">
            <h5 class="">Players</h5>
            <this.PlayersChangeButton />

        </div>
        <this.StateChangeButton />
      </div>
    );
  }
}
