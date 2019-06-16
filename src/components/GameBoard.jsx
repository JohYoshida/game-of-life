import React, { Component } from "react";
import Tile from "./Tile";

class GameBoard extends Component {
  render() {
    const GameBoard = this.makeGameBoard();
    return <div className="board">{GameBoard}</div>;
  }

  makeGameBoard = () => {
    const GameBoard = [];
    let row = [];
    const { x, y, data } = this.props;
    for (var i = 0; i < y; i++) {
      for (var j = 0; j < x; j++) {
        let id = `${i},${j}`;
        const tileData = data[id];
        row.push(<Tile id={id} key={id} tileData={tileData} />);
      }
      GameBoard.push(
        <div id={i} key={i} className="row">
          {row}
        </div>
      );
      row = [];
    }
    return GameBoard;
  };
}

export default GameBoard;
