import React, { Component } from "react";

class Controls extends Component {
  render() {
    return (
      <div className="Controls">
        <form>
          <div className="Dimensions">
            <div>
              <label>X</label>
              <input
                type="range"
                name="X"
                min="1"
                max="99"
                step="1"
                value={this.props.x}
                onChange={evt => this.props.updateInputX(evt)}
              />
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
                onChange={evt => this.props.updateInputY(evt)}
              />
              <label>{this.props.y}</label>
            </div>
          </div>
          <div className="Buttons">
            <button type="button" onClick={this.props.populateCells}>
              Randomize
            </button>
            <button type="button" onClick={this.props.resetBoard}>
              Reset
            </button>
            <button type="button" onClick={this.props.evolveState}>
              Evolve Once
            </button>
            <button type="button" onClick={this.props.runEvolution}>
              Run Evolution!
            </button>
          </div>
          <div className="History">
            <label>History</label>
            <input
              type="range"
              name="history"
              min="0"
              max={this.props.length}
              step="1"
              value={this.props.index}
              onChange={evt => this.props.showPastState(evt)}
            />
            <label>{this.props.index}</label>
          </div>
          <div className="Stamps">
            <button type="button" onClick={this.props.selectSingleStamp}>
              Single
            </button>
            <button type="button" onClick={this.props.selectDiamondStamp}>
              Diamond
            </button>
            <button type="button" onClick={this.props.selectPulsarStamp}>
              Pulsar
            </button>
          </div>
          <div className="Instructions">
            <div>click on a cell to populate or depopulate</div>
            <div>use a and d to explore history</div>
          </div>
        </form>
      </div>
    );
  }
}

export default Controls;
