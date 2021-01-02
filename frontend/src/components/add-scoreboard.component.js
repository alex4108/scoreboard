import React, { Component } from "react";
import ScoreboardDataService from "../services/scoreboard.service";
import { Link } from "react-router-dom";

export default class AddScoreboard extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.newGame = this.newGame.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "",
      started_at: "1970-01-01T00:01:00Z",
      ended_at: "1970-01-01T00:02:00Z",
      players: [
          {
            player_id: 0,
            score: 0
          }
      ],
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
        name: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
        description: e.target.value
    });
  }


  saveGame() {
    var data = {
      name: this.state.name,
      description: this.state.description
    };

    ScoreboardDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.title,
          description: response.data.description,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  newGame() {
    this.setState({
        name: "",
        description: "",
        started_at: "1970-01-01T00:01:00Z",
        ended_at: "1970-01-01T00:02:00Z",
        players: [
            {
              player_id: 0,
              score: 0
            }
        ],
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Created successfully!</h4>
            <Link to="/scoreboards/add" className="btn btn-success">Create New</Link>
            <br />
            <Link to="/scoreboards" className="btn btn-info">List</Link>

            
          </div>
        ) : (
          <div>
            <div className="form-group">
            <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
              
            </div>

            <button onClick={this.saveGame} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}