import React, { Component } from 'react';
import StateMap from "../utilities/stateMap"
class Cell extends Component {
    state = { 
        cellState: undefined
     }
    dim = 25
    color = "grey"

    constructor(props){
        super(props)
        this.w = this.props.cellState === StateMap.weighted ? true : false
    }

    makeWeighted = () => {
        this.w = true
    }

    makeBasic = () => {
        this.w = false
    }

    setCellState(cellState){
        if (!this.props.settings.started) {
            if (cellState === StateMap.weighted ) {
                this.makeWeighted()
            }else {
                this.makeBasic()
            }
        }
        
        const row = this.props.row
        const col = this.props.col
        const startCell = this.props.settings.startCell
        const targetCell = this.props.settings.targetCell

        if(col === startCell.col && row === startCell.row){
            return
        }
        if(col === targetCell.col && row === targetCell.row){
            return
        }
        this.setState({cellState}, ()=>{
            this.props.setSearchGrid(this.props.row, this.props.col, cellState)
        })
    }

    handleOnMouseDown() {
            this.setCellState(this.props.settings.changeCellTo)
    }
    handleOnMouseEnter() {
        if (this.props.mouseDown.isDown) {
            this.setCellState(this.props.settings.changeCellTo)
        }
    }

    renderCell = () => {
        const cellState = this.state.cellState ? this.state.cellState : this.props.cellState
        const disp = this.w ? "W" : ""
        const colorMap = {
            1: "grey",
            2: "green",
            3: "yellow",
            4: "red",
            5: "brown",
            6: "purple",
            7: "cyan",
            8: "black"
        }
        return (
        <div onMouseDown={()=>{this.handleOnMouseDown()}} onMouseEnter={()=>{this.handleOnMouseEnter()}} style={{width:this.dim, height:this.dim, backgroundColor:colorMap[cellState]}}>
        {disp}
        </div>
        )
    }

    render() {
        return ( 
            this.renderCell()
         );
    }
}
 
export default Cell;