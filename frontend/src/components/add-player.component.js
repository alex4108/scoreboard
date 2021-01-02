import React, { Component } from "react";
import PlayerDataService from "../services/player.service";

export default class AddPlayer extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.savePlayer = this.savePlayer.bind(this);
    this.newPlayer = this.newPlayer.bind(this);

    this.state = {
      id: null,
      name: "",
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
        name: e.target.value
    });
  }


  savePlayer() {
    var data = {
      name: this.state.name,
    };

    PlayerDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPlayer() {
    this.setState({
      id: null,
      name: "",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
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
            </div>

            <button onClick={this.savePlayer} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}