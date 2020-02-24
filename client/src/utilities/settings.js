import StateMap from "./stateMap"
import Search from "./search"
import SearchGrid from "./searchGrid"
class Settings {
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.alg = "Breadth First Search"
        this.grid = ""
        this.changeCellTo = StateMap.blocked
        this.startCell = { row: 9, col: 1 }
        this.targetCell = { row: 9, col: 19 }
        this.searchGrid = new SearchGrid(rows, cols, this.startCell, this.targetCell).getSearchGrid()
        this.flow = { counter: 0, changes: [] };
        this.started = false
        this.result = false
        this.speed = 50
    }

    getAlgorithms() {
        return Object.keys(Search.getAlgorithms())
    }

    setAlgorithm(alg) {
        this.alg = alg
    }

    runSearch = async () => {
        const grid = JSON.parse(JSON.stringify(this.searchGrid));
        const aSearch = new Search(grid, this.startCell, this.targetCell);
        return new Promise(resolve => {
            setTimeout(()=> {
                const result = aSearch.runSearch(this.alg)
                resolve(result)
            }, 1)
          }).then((result)=>{
            if (result) {
                this.result = true
                this.flow.changes = result.flow;
            }
          })
     
      };

    
    setStartCell(row, col) {
        this.startCell.row = row
        this.startCell.col = col
    }
    setTargetCell(row, col) {
        this.targetCell.row = row
        this.targetCell.col = col
    }
}

export default Settings