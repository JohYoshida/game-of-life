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
            <label>{this.props.y}</label>
          </div>
        </form>
      </div>
    );
  }
}

export default Controls;
