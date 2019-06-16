import React, { Component } from "react";

class Tile extends Component {
  render() {
    const { tileData } = this.props;
    let className = "tile";
    if (tileData === "alive") className += " alive";
    else className += " dead";
    return <div className={className}></div>;
  }
}

export default Tile;
