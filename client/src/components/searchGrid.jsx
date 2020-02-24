import React, { Component } from "react";
import StateMap from "../utilities/stateMap";
import Cell from "./cell";
import { Grid } from "@material-ui/core";

//TODO: maybe create a function to regulate speed of iteration
//TODO: maybe two searches in parallel
class SearchGrid extends Component {
  state = {};
  mouseDown ={isDown: false}
  cellSpacing = 1;
  flow = this.props.settings.flow

  constructor(props) {
    super(props);
    this.settings = this.props.settings
    this.searchGrid = this.props.settings.searchGrid;
  }

  componentDidUpdate() {
    if (this.props.settings.result) {
      this.visualizer()
    }  
  }

  visualizer = () => {
    const interval = setInterval(() => {
      if(this.flow.counter >= this.flow.changes.length-1) clearInterval(interval)
      const { pos, state } = this.flow.changes[this.flow.counter];
      this.flow.counter += 1;
      this.setCellState(pos.row, pos.col, state);
    }, this.props.settings.speed);
  };

  setStart = (row, col) => {
    const oldRow = this.settings.startCell.row
    const oldCol = this.settings.startCell.col
    this.settings.setStartCell(row,col)
    this.searchGrid[oldRow][oldCol] = StateMap.basic
    this.setCellState(row, col, StateMap.start)
    this.setCellState(oldRow, oldCol, StateMap.basic)
  }

  setTarget = (row,col) => {
    const oldRow = this.settings.targetCell.row
    const oldCol = this.settings.targetCell.col
    this.settings.setTargetCell(row,col)
    this.searchGrid[oldRow][oldCol] = StateMap.basic
    this.setCellState(row, col, StateMap.target)
    this.setCellState(oldRow, oldCol, StateMap.basic)
    
  }

  setSearchGrid = (row, col, cellState) => {
    this.searchGrid[row][col] = cellState
    if (cellState===StateMap.start) {
      this.setStart(row, col)
    }
    if (cellState===StateMap.target) {
      this.setTarget(row,col)
    }
  }

  setCellState = (row, col, cellState) => {
    const ref = "cell_" + row.toString() + "_" + col.toString();
    this.refs[ref].setCellState(cellState);
  };

  handleOnMouseDown = () => {
    this.mouseDown.isDown = true
  }

  handleOnMouseUp = () => {
    this.mouseDown.isDown = false
  }

  renderCell = (row, col) => {
    const ref = "cell_" + row.toString() + "_" + col.toString();
    return (
      <Grid item key={col}>
        <Cell
          ref={ref}
          row={row}
          col={col}
          setSearchGrid={this.setSearchGrid}
          settings={this.settings}
          mouseDown={this.mouseDown}
          cellState={this.searchGrid[row][col]}
        ></Cell>
      </Grid>
    );
  };

  renderRow = row => {
    let comp = [];
    for (let col = 0; col < this.settings.cols; col++) {
      comp.push(this.renderCell(row, col));
    }

    return (
      <Grid container item key={row} wrap="nowrap" spacing={this.cellSpacing}>
        {comp}
      </Grid>
    );
  };

  renderGrid = () => {
    let comp = [];
    for (let row = 0; row < this.settings.rows; row++) {
      comp.push(this.renderRow(row));
    }

    return (
      <Grid
        container
        wrap="wrap"
        spacing={this.cellSpacing}
        justify="center"
        alignItems="center"
        onMouseDown={()=>{this.handleOnMouseDown()}}
        onMouseUp={()=>{this.handleOnMouseUp()}}
      >
        {comp}
      </Grid>
    );
  };

  render() {
    return this.renderGrid();
  }
}

export default SearchGrid;
