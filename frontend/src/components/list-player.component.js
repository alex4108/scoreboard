import React, { Component } from "react";
import PlayerDataService from "../services/player.service";
import { Link } from "react-router-dom";

export default class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.retrievePlayers = this.retrievePlayers.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      players: [],
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrievePlayers();
  }


  retrievePlayers() {
    PlayerDataService.getAll()
      .then(response => {
        this.setState({
          players: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePlayers();
  }


  render() {
    const { players, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Players List</h4>

          <ul className="list-group">
            {players &&
              players.map((player, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  key={index}
                >
                  {player.name}
                </li>
              ))}
          </ul>

        </div>
      </div>
    );
  }
}
