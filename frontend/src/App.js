// https://bezkoder.com/react-crud-web-api/
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import PlayerList from './components/list-player.component';
import AddPlayer from './components/add-player.component';
import AddScoreboard from './components/add-scoreboard.component';
import ScoreboardList from './components/list-scoreboard.component';
import ScoreboardSingle from './components/single-scoreboard.component';
import ScoreboardPlayers from './components/edit-players.component';
import ScoreboardRef from './components/ref-scoreboard.component';
import ScoreboardLive from './components/live-scoreboard.component';

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
            <Route exact path="/scoreboards/add" component={AddScoreboard} />
            <Route exact path="/scoreboards/info/:id" component={ScoreboardSingle} />
            <Route exact path="/scoreboards/players/:id" component={ScoreboardPlayers} />
            <Route exact path="/scoreboards/referee/:id" component={ScoreboardRef} />
            <Route exact path="/scoreboards/live/:id" component={ScoreboardLive} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;