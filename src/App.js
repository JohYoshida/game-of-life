import React, { Component } from "react";
import Controls from "./components/Controls";
import GameBoard from "./components/GameBoard";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 25,
      y: 25,
      data: {}
    };
  }

  render() {
    const { x, y, data } = this.state;
    return (
      <div className="App">
        <Controls
          x={x}
          y={y}
          updateInputX={this.updateInputX}
          updateInputY={this.updateInputY}
          populateBoard={this.populateBoard}
          evolveState={this.evolveState}
          runEvolution={this.runEvolution}
        />
        <GameBoard x={x} y={y} data={data} />
      </div>
    );
  }

  updateInputX = evt => {
    this.setState({ x: evt.target.value });
  };

  updateInputY = evt => {
    this.setState({ y: evt.target.value });
  };

  populateBoard = () => {
    const data = {};
    const { x, y } = this.state;
    for (var i = 0; i < y; i++) {
      for (var j = 0; j < x; j++) {
        let id = `${i},${j}`;
        if (Math.random() > 0.5) data[id] = "alive";
        else data[id] = "dead";
      }
      this.setState({ data });
    }
  };

  evolveState = () => {
    // copy data from state
    const { x, y, data } = this.state;
    const updatedData = {};
    // iterate through data
    for (var i = 0; i < y; i++) {
      for (var j = 0; j < x; j++) {
        // check living status
        let id = `${i},${j}`;
        let isAlive;
        if (data[id] === "alive") isAlive = true;
        else isAlive = false;
        // check neighbors
        let aliveCount = checkNeighbours(data, i, j);
        // decide fate
        decideFate(id, isAlive, aliveCount, updatedData);
      }
    }
    // update data
    this.setState({ data: updatedData });
  };

  runEvolution = () => {
    for (var i = 0; i < 100; i++) {
      setTimeout(() => {
        this.evolveState();
      }, 3000);
    }
    console.log("Evolution finished");
  };
}

function checkNeighbours(data, i, j) {
  let aliveCount = 0;
  // check above left
  if (data[`${i - 1},${j - 1}`] === "alive") aliveCount++;
  // check above
  if (data[`${i - 1},${j}`] === "alive") aliveCount++;
  // check above right
  if (data[`${i - 1},${j + 1}`] === "alive") aliveCount++;
  // check left
  if (data[`${i},${j - 1}`] === "alive") aliveCount++;
  // check right
  if (data[`${i},${j + 1}`] === "alive") aliveCount++;
  // check below left
  if (data[`${i + 1},${j - 1}`] === "alive") aliveCount++;
  // check below
  if (data[`${i + 1},${j}`] === "alive") aliveCount++;
  // check below right
  if (data[`${i + 1},${j + 1}`] === "alive") aliveCount++;
  return aliveCount;
}

function decideFate(id, isAlive, aliveCount, updatedData) {
  if (isAlive) {
    switch (aliveCount) {
      case 0: // underpopulation
      case 1: // underpopulation
        updatedData[id] = "dead";
        break;
      case 2: // survival
      case 3: // survival
        updatedData[id] = "alive";
        break;
      case 4: // overpopulation
      case 5: // overpopulation
      case 6: // overpopulation
      case 7: // overpopulation
      case 8: // overpopulation
        updatedData[id] = "dead";
        break;
      default:
        console.log(
          "Something went wrong in evolveState()",
          id,
          aliveCount,
          isAlive
        );
    }
  } else {
    if (aliveCount === 3) {
      updatedData[id] = "alive";
    } else updatedData[id] = "dead";
  }
}

export default App;
