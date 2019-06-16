import React, { Component } from "react";

class Controls extends Component {
  render() {
    return (
      <div className="Controls">
        <form>
          <div>
            <label>X</label>
            <input
              type="range"
              name="X"
              min="1"
              max="99"
              step="1"
              value={this.props.x}
              onChange={evt => this.props.updateInputX(evt)} />
            <label>{this.props.x}</label>
          </div>
          <div>
            <label>Y</label>
            <input
              type="range"
              name="Y"
              min="1"
              max="99"
              step="1"
              value={this.props.y}
              onChange={evt => this.props.updateInputY(evt)} />
            <label>{this.props.y}</label>
          </div>
          <div>
            <button type="button" onClick={this.props.populateBoard}>Populate</button>
            <button type="button" onClick={this.props.evolveState}>Evolve Once</button>
            <button type="button" onClick={this.props.runEvolution}>Run Evolution!</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Controls;
