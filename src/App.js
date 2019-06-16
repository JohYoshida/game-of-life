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
}

export default App;
