import React, { Component } from "react";
import "./App.css";
import Settings from "./utilities/settings";
import SearchGrid from "./components/searchGrid";
import Options from "./components/options";
import { Grid } from "@material-ui/core";

class App extends Component {
  state = {};
  constructor() {
    super();
    this.settings = new Settings(20, 20);
  }

  start= async () => {
      await this.settings.runSearch().then(()=>{
        this.forceUpdate()
      })
      
  };

  render() {
    return (
      <Grid container>
        <Options settings={this.settings} start={this.start}></Options>
        <SearchGrid ref={"search_grid"} settings={this.settings}></SearchGrid>
      </Grid>
    );
  }
}

export default App;
