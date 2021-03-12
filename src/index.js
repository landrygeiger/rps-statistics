import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Title from "./components/Title";
import StatDisplay from "./components/StatDisplay";
import GameEntry from "./components/GameEntry";

/*
// returns opponents move given what move I played and if I won
function getOpponentMove(move, didWin) {
  const moves = [ "rock", "scissors", "paper" ];
  const offset = didWin ? 1 : -1;
  return moves[(moves.indexOf(move) + offset + 3) % 3];
}

// Header bar
const Title = () => {
  return (
    <div className="title shadow">
      <h3 className="text-title"><i className="far fa-list-alt"></i> LANDRY GEIGER</h3>
      <h5 className="text-subtitle">ROCK PAPER SCISSORS STATISTICS</h5>
    </div>
  )
}

const Loader = () => {
  return (
    <div className="loader"></div>
  )
}

// Renders a pie chart displaying WL%
class PieChartDisplay extends React.Component {
  render() {
    const wLPercent = this.props.wins / (this.props.wins + this.props.losses)
    return (
      <div className="pie-chart-display">
        <div className="pie-chart-container shadow">
          {this.props.loading ? <Loader /> :
          <div className="pie-chart" style={{background: `conic-gradient( #9aff63 ${180 * wLPercent}deg,  #ff745c 0 180deg,  white 0)`}}>
            <div className="pie-chart-label">
              <h3 style={ {fontWeight: "bold", fontSize: 50} }>{ (wLPercent * 100).toFixed(2) }</h3>
              <h4> WL%</h4>
            </div>
          </div>
          }
        </div>
      </div>
    )
  }
}

// Displays information about a specific game
class Game extends React.Component {
  render() {
    const game = this.props.game;
    const moveClass = "far fa-hand-".concat(game.playedMove);
    const oppMoveClass = "far fa-hand-".concat(getOpponentMove(game.playedMove, game.isWin));
    return (
      <div className="game">
        <div className={game.isWin ? "win-background" : "loss-background"}></div>
        <div className="game-info shadow">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <h1>{game.id}</h1>
            <h1><i className={moveClass}></i> - <i className={oppMoveClass}></i></h1>
            <h5>{game.opponent}</h5>
          </div>
          
        </div>
      </div>
    )
  }
}

// Displays a list of played games
class GameDisplay extends React.Component {
  render() {
    // const games = this.props.games.map(gameI => <li className="game-list-item"><Game game={gameI} /></li>);
    const games = this.props.games.map(gameI => <Game game={gameI} />);
    return (
      <div className="game-list">
        {games.reverse()}
      </div>
    )
  }
}

// Displays list of played games and also pie chart displaying WL%
class StatDisplay extends React.Component {
  render() {
    const games = this.props.games;
    const wins = games.filter(val => val.isWin).length;
    const losses = games.length - wins;
    return (
      <div className="stat-display shadow">
        <PieChartDisplay wins={wins} losses={losses} loading={this.props.loading}/>
        <GameDisplay games={games} />
      </div>
    )
  }
}
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [
        
      ],
      loading: true
    }
  }

  async componentDidMount() {
    const url = "https://us-central1-rock-paper-scissors-statistics.cloudfunctions.net/api/games";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      games: data,
      loading: false
    });
  }

  render() {
    return (
      <div className="app">
        <Title />
        <Router>
          <Switch>
            <Route path="/" exact component={() => <StatDisplay games={this.state.games} loading={this.state.loading}/>} />
            <Route path="/admin" exact component={() => <GameEntry />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));