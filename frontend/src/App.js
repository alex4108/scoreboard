// https://bezkoder.com/react-crud-web-api/
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import PlayerList from './components/list-player.component';
import AddPlayer from './components/add-player.component';
import ScoreboardList from './components/list-scoreboard.component';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            Scoreboards
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/players"} className="nav-link">
                Players
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/players"]} component={PlayerList} />
            <Route exact path={["/", "/scoreboards"]} component={ScoreboardList} />
            <Route exact path="/players/add" component={AddPlayer} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;