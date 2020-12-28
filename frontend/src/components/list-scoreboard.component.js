import React, { Component } from "react";
import ScoreboardDataService from "../services/scoreboard.service";
import { Link } from "react-router-dom";

export default class ScoreboardList extends Component {
  constructor(props) {
    super(props);
    this.retrieveScoreboards = this.retrieveScoreboards.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      players: [],
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveScoreboards();
  }


  retrieveScoreboards() {
    ScoreboardDataService.getAll()
      .then(response => {
        this.setState({
          scoreboards: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveScoreboards();
  }


  render() {
    const { scoreboards, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Scoreboard List</h4>

          <ul className="list-group">
            {scoreboards &&
              scoreboards.map((scoreboard, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  key={index}
                >
                  {scoreboard.name} {scoreboard.id}
                </li>
              ))}
          </ul>

        </div>
      </div>
    );
  }
}
