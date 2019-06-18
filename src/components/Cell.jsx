import React, { Component } from "react";

class Cell extends Component {
  render() {
    const { area, cellData, variant, id } = this.props;
    const className = makeClassName(area, cellData, variant);
    return <div className={className} onClick={this.props.flipCell.bind(this, id, cellData)} />;
  }
}

function makeClassName(area, cellData, variant) {
  let className = "cell " + area;
  if (cellData === "alive") className += " alive";
  else className += " dead";
  switch (variant) {
    case 0:
      className += "-green";
      break;
    case 1:
      className += "-lightGreen";
      break;
    case 2:
      className += "-lime";
      break;
    case 3:
      className += "-yellow";
      break;
    case 4:
      className += "-amber";
      break;
    case 5:
      className += "-orange";
      break;
    case 6:
      className += "-deepOrange";
      break;
    case 7:
      className += "-red";
      break;
    case 8:
      className += "-pink";
      break;
    case 9:
      className += "-purple";
      break;
    case 10:
      className += "-deepPurple";
      break;
    case 11:
      className += "-indigo";
      break;
    case 12:
      className += "-blue";
      break;
    case 13:
      className += "-lightBlue";
      break;
    case 14:
      className += "-cyan";
      break;
    case 15:
      className += "-teal";
      break;
    default:
      console.log("Error choosing color in Cell.jsx");
  }
  return className;
}

export default Cell;
