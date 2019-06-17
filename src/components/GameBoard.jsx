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
    const { x, y, data, index } = this.props;
    // Color variant
    const variant = Math.floor(index % 16);
    // Size
    let area = x * y;
    if (area < 625) area = "small";
    else if (area >= 654 && area < 2500) area = "medium";
    else area = "large";
    // Make each row
    for (var i = 0; i < y; i++) {
      // Make each tile
      for (var j = 0; j < x; j++) {
        let id = `${i},${j}`;
        const tileData = data[id];
        row.push(
          <Tile id={id} key={id} tileData={tileData} variant={variant} area={area} />
        );
      }
      // Add row to GameBoard
      GameBoard.push(
        <div id={i} key={i} className="row">
          {row}
        </div>
      );
      // Prepare for next row
      row = [];
    }
    return GameBoard;
  };
}

export default GameBoard;
