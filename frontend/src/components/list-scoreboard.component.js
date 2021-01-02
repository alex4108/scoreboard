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
          scoreboards: response.data.reverse()
        });
        console.log(response.data.reverse());
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
          <h4 class="">Games List</h4>
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
                <Link to={"/scoreboards/info/" + scoreboard.id} className="nav-link">{
                  new Date(scoreboard.createdAt).getMonth()+1 
                }
                -
                {
                  new Date(scoreboard.createdAt).getDate() 
                }
                -
                {
                  new Date(scoreboard.createdAt).getFullYear() 
                } {scoreboard.name}</Link>
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          <Link to={"/scoreboards/add"} className="btn btn-success">
              New Game
          </Link>
        </div>
      </div>
    );
  }
}
