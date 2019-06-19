import React, { Component } from "react";
import KeyHandler from "react-key-handler";
import Controls from "./components/Controls";
import GameBoard from "./components/GameBoard";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 25,
      y: 25,
      data: {},
      hoverData: {},
      history: [],
      index: 0,
      offset: 0,
      stamp: "none"
    };
  }

  render() {
    const { x, y, data, hoverData, history, index, offset } = this.state;
    let length = history.length - 1;
    return (
      <div className="App">
        <Controls
          x={x}
          y={y}
          index={index}
          length={length}
          updateInputX={this.updateInputX}
          updateInputY={this.updateInputY}
          populateCells={this.populateCells}
          resetBoard={this.resetBoard}
          evolveState={this.evolveState}
          runEvolution={this.runEvolution}
          showPastState={this.showPastState}
          selectSingleStamp={this.selectSingleStamp}
          selectDiamondStamp={this.selectDiamondStamp}
          selectPulsarStamp={this.selectPulsarStamp}
        />
        <GameBoard
          x={x}
          y={y}
          data={data}
          hoverData={hoverData}
          index={index}
          offset={offset}
          flipCell={this.flipCell}
          setHoverData={this.setHoverData}
          removeHoverData={this.removeHoverData}
        />
        <KeyHandler keyValue="a" onKeyHandle={this.handleKeyPress} />
        <KeyHandler keyValue="d" onKeyHandle={this.handleKeyPress} />
      </div>
    );
  }

  updateInputX = evt => {
    this.setState({
      x: evt.target.value,
      data: {},
      history: [],
      index: 0
    });
  };

  updateInputY = evt => {
    this.setState({
      y: evt.target.value,
      data: {},
      history: [],
      index: 0
    });
  };

  showPastState = evt => {
    const index = Number(evt.target.value);
    const { history } = this.state;
    this.setState({
      index,
      data: history[index]
    });
  };

  handleKeyPress = evt => {
    const { history, data, index } = this.state;
    if (evt.key === "a") {
      if (history.length > 0 && index > 0) {
        this.setState({
          data: history[index - 1],
          index: index - 1
        });
      }
    }
    if (evt.key === "d") {
      let size = Object.keys(data).length;
      if (size === 0) {
        // No data
        this.populateCells();
      } else {
        if (history.length - 1 === index) {
          // Most recent state
          this.evolveState();
        } else {
          // Intermediate state
          this.setState({
            data: history[index + 1],
            index: index + 1
          });
        }
      }
    }
  };

  flipCell = (id, cellData) => {
    let { data, index, history, stamp, hoverData } = this.state;
    switch (stamp) {
      case "single":
        if (cellData === "alive") cellData = "dead";
        else cellData = "alive";
        data[id] = cellData;
        break;
      case "diamond":
      case "pulsar":
        for (let item in hoverData) {
          data[item] = "alive";
        }
        break;
      default:
        console.log('error');
    }
    history = history.slice(0, index);
    history.push(data);
    this.setState({ data, history, hoverData: {} });
  };

  setHoverData = (id, cellData) => {
    let { stamp } = this.state;
    let hoverData = {};
    // Convert id into Number coordinates
    const coords = id.split(",").map(i => {
      return Number(i);
    });
    switch (stamp) {
      case "single":
        hoverData[id] = true;
        break;
      case "diamond":
        // Add diamond coords to list
        hoverData = addDiamondCoords(coords);
        break;
      case "pulsar":
        // Add diamond coords to list
        hoverData = addPulsarCoords(coords);
        break;
      default:
        console.log("default");
    }
    this.setState({ hoverData });
  };

  removeHoverData = () => {
    this.setState({ hoverData: {} });
  }

  populateCells = () => {
    const data = {};
    const { x, y } = this.state;
    const history = [];
    for (var i = 0; i < y; i++) {
      for (var j = 0; j < x; j++) {
        let id = `${i},${j}`;
        if (Math.random() > 0.5) data[id] = "alive";
        else data[id] = "dead";
      }
    }
    history.push(data);
    this.setState({
      data,
      history,
      index: 0,
      offset: Math.floor(Math.random() * 16)
    });
  };

  resetBoard = () => {
    this.setState({
      data: {},
      history: [],
      index: 0,
      offset: Math.floor(Math.random() * 16)
    });
  };

  evolveState = () => {
    // copy data from state
    const { x, y, data, history } = this.state;
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
    history.push(updatedData);
    this.setState({
      data: updatedData,
      index: history.length - 1,
      history
    });
  };

  runEvolution = () => {
    let size = Object.keys(this.state.data).length;
    if (size === 0) {
      this.populateCells();
    }
    for (var i = 0; i < 10; i++) {
      setTimeout(() => {
        this.evolveState();
      }, 1000);
    }
  };

  selectSingleStamp = () =>{
    this.setState({ stamp: "single" });
  };

  selectDiamondStamp = () => {
    this.setState({
      stamp: "diamond"
    });
  };

  selectPulsarStamp = () => {
    this.setState({
      stamp: "pulsar"
    });
  }
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
      // reproduction
      updatedData[id] = "alive";
    } else updatedData[id] = "dead";
  }
}

function addDiamondCoords(coords) {
  const hoverData = {};
  let list = [];
  let coordinate;
  // Top
  coordinate = coords.slice(0);
  coordinate[0] += -2
  list.push(coordinate);
  // Top left
  coordinate = coords.slice(0);
  coordinate[0] += -1
  coordinate[1] += -1
  list.push(coordinate)
  // Top right
  coordinate = coords.slice(0);
  coordinate[0] += -1
  coordinate[1] += 1
  list.push(coordinate);
  // Left
  coordinate = coords.slice(0);
  coordinate[1] += -2
  list.push(coordinate);
  // Right
  coordinate = coords.slice(0);
  coordinate[1] += 2
  list.push(coordinate);
  // Bottom left
  coordinate = coords.slice(0);
  coordinate[0] += 1
  coordinate[1] += -1
  list.push(coordinate);
  // Bottom right
  coordinate = coords.slice(0);
  coordinate[0] += 1
  coordinate[1] += 1
  list.push(coordinate);
  // Bottom
  coordinate = coords.slice(0);
  coordinate[0] += 2
  list.push(coordinate);
  // Add to hoverData
  list.forEach(i => {
    let coord = i.toString();
    hoverData[coord] = true;
  });
  return hoverData;
}

function addPulsarCoords(coords) {
  const hoverData = {};
  let list = [];
  let coordinate;
  // Top row
  coordinate = coords.slice(0);
  coordinate[0] += -6;
  coordinate[1] += -4;
  list.push(coordinate.toString());
  coordinate[1] += 1;
  list.push(coordinate.toString());
  coordinate[1] += 1;
  list.push(coordinate.toString());
  coordinate[1] += 4;
  list.push(coordinate.toString());
  coordinate[1] += 1;
  list.push(coordinate.toString());
  coordinate[1] += 1;
  list.push(coordinate.toString());
  // Center top row
  coordinate = coords.slice(0);
  coordinate[0] += -1;
  coordinate[1] += -4;
  list.push(coordinate.toString());
  coordinate[1] += 1;
  list.push(coordinate.toString());
  coordinate[1] += 1;
  list.push(coordinate.toString());
  coordinate[1] += 4;
  list.push(coordinate.toString());
  coordinate[1] += 1;
  list.push(coordinate.toString());
  coordinate[1] += 1;
  list.push(coordinate.toString());
  // Center bottom row
  coordinate = coords.slice(0);
  coordinate[0] += 1;
  coordinate[1] += -4;
  list.push(coordinate.toString());
  coordinate[1] += 1;
  list.push(coordinate.toString());
  coordinate[1] += 1;
  list.push(coordinate.toString());
  coordinate[1] += 4;
  list.push(coordinate.toString());
  coordinate[1] += 1;
  list.push(coordinate.toString());
  coordinate[1] += 1;
  list.push(coordinate.toString());
  // Bottom row
  coordinate = coords.slice(0);
  coordinate[0] += 6;
  coordinate[1] += -4;
  list.push(coordinate.toString());
  coordinate[1] += 1;
  list.push(coordinate.toString());
  coordinate[1] += 1;
  list.push(coordinate.toString());
  coordinate[1] += 4;
  list.push(coordinate.toString());
  coordinate[1] += 1;
  list.push(coordinate.toString());
  coordinate[1] += 1;
  list.push(coordinate.toString());
  // Left column
  coordinate = coords.slice(0);
  coordinate[1] += -6;
  coordinate[0] += -4;
  list.push(coordinate.toString());
  coordinate[0] += 1;
  list.push(coordinate.toString());
  coordinate[0] += 1;
  list.push(coordinate.toString());
  coordinate[0] += 4;
  list.push(coordinate.toString());
  coordinate[0] += 1;
  list.push(coordinate.toString());
  coordinate[0] += 1;
  list.push(coordinate.toString());
  // Center left column
  coordinate = coords.slice(0);
  coordinate[1] += -1;
  coordinate[0] += -4;
  list.push(coordinate.toString());
  coordinate[0] += 1;
  list.push(coordinate.toString());
  coordinate[0] += 1;
  list.push(coordinate.toString());
  coordinate[0] += 4;
  list.push(coordinate.toString());
  coordinate[0] += 1;
  list.push(coordinate.toString());
  coordinate[0] += 1;
  list.push(coordinate.toString());
  // Center right column
  coordinate = coords.slice(0);
  coordinate[1] += 1;
  coordinate[0] += -4;
  list.push(coordinate.toString());
  coordinate[0] += 1;
  list.push(coordinate.toString());
  coordinate[0] += 1;
  list.push(coordinate.toString());
  coordinate[0] += 4;
  list.push(coordinate.toString());
  coordinate[0] += 1;
  list.push(coordinate.toString());
  coordinate[0] += 1;
  list.push(coordinate.toString());
  // Right column
  coordinate = coords.slice(0);
  coordinate[1] += 6;
  coordinate[0] += -4;
  list.push(coordinate.toString());
  coordinate[0] += 1;
  list.push(coordinate.toString());
  coordinate[0] += 1;
  list.push(coordinate.toString());
  coordinate[0] += 4;
  list.push(coordinate.toString());
  coordinate[0] += 1;
  list.push(coordinate.toString());
  coordinate[0] += 1;
  list.push(coordinate.toString());

  // Add to hoverData
  list.forEach(i => {
    let coord = i.toString();
    hoverData[coord] = true;
  });
  return hoverData;
}

export default App;
