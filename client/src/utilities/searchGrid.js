import StateMap from "./stateMap"
export default class SearchGrid {
    constructor(rows, cols, start, target){
        this.rows = rows
        this.cols = cols
        this.start = start
        this.target = target
        this.searchGrid = undefined
        this.createSearchGrid()
        //this.addRandomWeights()
    }
    createSearchGrid = () => {
        let searchGrid = [];
        for (let row = 0; row < this.rows; row++) {
          let aRow = [];
          for (let col = 0; col < this.cols; col++) {
            let cell = StateMap.basic;
            // default start cell and target cell
            if (row === this.start.row && col === this.start.col) {
              cell = StateMap.start;
            }
            if (row === this.target.row && col === this.target.col) {
              cell = StateMap.target;
            }
            aRow.push(cell);
          }
          searchGrid.push(aRow);
        }
        this.searchGrid = searchGrid
      };

    getSearchGrid = () =>{
      return this.searchGrid
    }

    addRandomWeights = (percent) => {
      percent = percent > 1 ? percent/=100 : percent
      const total = this.rows*this.cols
      let count = 0

      while (count <= Math.floor(total*0.4)) {
        const rand_row = Math.floor(Math.random() * this.rows);
        const rand_col = Math.floor(Math.random() * this.cols);
        const val = this.searchGrid[rand_row][rand_col]
        if (rand_row === this.start.row && rand_col === this.start.col) {
          continue
        }
        if (rand_row === this.target.row && rand_col === this.target.col) {
          continue
        }
        if (val !== StateMap.weighted) {
          this.searchGrid[rand_row][rand_col] = StateMap.weighted
          count += 1
        }        
      }
    }
}