import React, { Component } from "react";
import StateMap from "../utilities/stateMap";
import {
  Grid,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  Select,
  FormLabel,
  InputLabel,
  MenuItem,
  Button
} from "@material-ui/core";
import {
  FastForward,
  FastRewind,
  PlayArrow,
  Pause,
  Sync
} from "@material-ui/icons";

class Options extends Component {
  state = {
    started: false,
    radio: this.props.settings.changeCellTo.toString(),
    alg: "",
    grid: ""
  };

  handleAlgSelect = event => {
      this.props.settings.setAlgorithm(event.target.value)
    this.setState({ alg: event.target.value });
  };

  renderAlgSelect = () => {
    const algs = this.props.settings.getAlgorithms();

    const comp = (
        <FormControl variant={"outlined"} style={{width: 180}}>
            <InputLabel id="label">Select Algorithm</InputLabel>
            <Select onChange={this.handleAlgSelect} value={this.state.alg}>
            {algs.map(alg => {
                return <MenuItem value={alg} key={alg} >{alg}</MenuItem>;
            })}
            </Select>
        </FormControl>
    );
    return comp;
  };

  handleGridSelect = (event) => {
      this.props.settings.grid = event.target.value
    this.setState({ grid: event.target.value });
  };

  renderGridSelect = () => {
    const grids = ["default", "other", "lastone"]
    const comp = (
        
      <FormControl variant={"outlined"} style={{minWidth: 150}}>
          <InputLabel id="label">Select a Grid</InputLabel>
        <Select onChange={this.handleGridSelect} value={this.state.grid}>
            {grids.map(grid=>{
                return (
                    <MenuItem value={grid} key={grid}>{grid}</MenuItem>
                )
            })}
        </Select>
      </FormControl>
    );
    return comp;
  };

  handlePlayback = () => {
    console.log("playback");
  };

  renderPlayOptions = () => {
    const comp = (
      <Grid container>
        <FastRewind></FastRewind>
        <PlayArrow color={"action"} ></PlayArrow>
        <Pause></Pause>
        <FastForward></FastForward>
        <Sync></Sync>
      </Grid>
    );
    return comp;
  };

  handleEditRadios = event => {
    this.props.settings.changeCellTo = parseInt(event.target.value);
    this.setState({ radio: event.target.value.toString() });
  };

  renderEditRadios = () => {
    const comp = (
      <FormControl size="small">
        <FormLabel>Label</FormLabel>
        <RadioGroup
          onChange={this.handleEditRadios}
          value={this.state.radio}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <FormControlLabel
            value={StateMap.basic.toString()}
            control={<Radio color="primary" size="small" />}
            label="Basic"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value={StateMap.blocked.toString()}
            control={<Radio color="primary" size="small" />}
            label="Block"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value={StateMap.weighted.toString()}
            control={<Radio color="primary" size="small" />}
            label="Weight"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value={StateMap.start.toString()}
            control={<Radio color="primary" size="small" />}
            label="Start"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value={StateMap.target.toString()}
            control={<Radio color="primary" size="small" />}
            label="Target"
            labelPlacement="bottom"
          />
        </RadioGroup>
      </FormControl>
    );
    return comp;
  };
  
  handleStart = () => {
      this.props.settings.started = true
      this.setState({started: true}, ()=> this.props.start())
  }

  renderStartButton = () => {
      const comp = (
          <Button disabled={this.state.alg.length===0} onMouseUp={this.handleStart} style={{borderRadius:100, backgroundColor:"green"}}>Start</Button>
      )
      return comp
  }

  render() {
    return (
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item>{this.renderAlgSelect()}</Grid>
        <Grid item>{this.renderGridSelect()}</Grid>
        <Grid item>
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item>{this.renderStartButton()}</Grid>
                { (this.state.started) &&
                    <Grid item>{this.renderPlayOptions()}</Grid>
                }
                
            </Grid>
        </Grid>
        <Grid item>{this.renderEditRadios()}</Grid>
        
      </Grid>
    );
  }
}

export default Options;
