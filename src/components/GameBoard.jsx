import React, { Component } from "react";
import Cell from "./Cell";

class GameBoard extends Component {
  render() {
    const GameBoard = this.makeGameBoard();
    return <div className="board">{GameBoard}</div>;
  }

  makeGameBoard = () => {
    const GameBoard = [];
    let row = [];
    const { x, y, data, hoverData, index, offset } = this.props;
    // Color variant
    const variant = Math.floor((index + offset) % 16);
    // Size
    let area = x * y;
    if (area < 625) area = "small";
    else if (area >= 625 && area < 2500) area = "medium";
    else area = "large";
    // Make each row
    for (var i = 0; i < y; i++) {
      // Make each cell
      for (var j = 0; j < x; j++) {
        let id = `${i},${j}`;
        const cellData = data[id];
        const hover = (hoverData[id]) ? true : false;
        row.push(
          <Cell
            id={id}
            key={id}
            cellData={cellData}
            hover={hover}
            variant={variant}
            area={area}
            flipCell={this.props.flipCell}
            setHoverData={this.props.setHoverData}
            removeHoverData={this.props.removeHoverData}
          />
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
