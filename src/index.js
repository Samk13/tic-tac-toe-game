import React from "react";
import ReactDOM from "react-dom";
import Game from "./Components/TicTacToe"

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe Game</h1>
      <div id="container">
      <Game />
      </div>
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById("root"));
