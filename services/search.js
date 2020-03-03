const StateMap = require("./stateMap");

class Search {
  constructor(grid, startPos, targetPos) {
    console.log("constructed");
    // this.grid = grid;
    // this.rows = grid.length;
    // this.cols = grid[0].length;
    // this.targetPos = targetPos;
    // this.startPos = startPos;
    // this.flow = [];
    // this.visited = {};
    // this.algorithms = {
    //   "Breadth First Search": this.bfs,
    //   "Depth First Search": this.dfs,
    //   "A* Search": this.aStar,
    //   "Dijkstra's": this.dijkstra
    // };
  }

  isTarget(pos) {
    const row = pos.row;
    const col = pos.col;
    const targetRow = this.targetPos.row;
    const targetCol = this.targetPos.col;

    return targetCol === col && targetRow === row;
  }

  samePos(pos1, pos2) {
    return pos1.row === pos2.row && pos1.col === pos2.col;
  }

  addToFlow(pos, state) {
    this.flow.push({ pos: pos, state: state });
  }

  changeCellState(pos, state) {
    this.grid[pos.row][pos.col] = state;
    this.addToFlow(pos, state);
  }

  getCellState(pos) {
    return this.grid[pos.row][pos.col];
  }

  addPathToFlow(path) {
    for (const pos of path) {
      this.addToFlow(pos, StateMap.path);
    }
  }

  posObj(row, col) {
    return { row: row, col: col };
  }

  addToVisited(pos, state = StateMap.searched) {
    this.changeCellState(pos, StateMap.searched);
    this.flow.push({ pos: pos, state: state });
    const rowStr = pos.row.toString();
    const colStr = pos.col.toString();
    const key = rowStr + "-" + colStr;
    this.visited[key] = true;
  }

  shouldVisit(pos) {
    const cellState = this.getCellState(pos);
    if (
      cellState !== StateMap.searched &&
      cellState !== StateMap.on_deck &&
      cellState !== StateMap.blocked
    ) {
      //this.changeCellState(pos, StateMap.on_deck)
      return true;
    }
    return false;
  }

  getNeighbours(pos) {
    const row = pos.row;
    const col = pos.col;
    const neighbours_obj = {
      right: col + 1 < this.cols ? { row: row, col: col + 1 } : undefined,
      //bottomRight: row + 1 < this.rows && col + 1 < this.cols ? this.posObj(row+1, col+1) : undefined,
      bottom: row + 1 < this.rows ? { row: row + 1, col: col } : undefined,
      //bottomLeft: row + 1 < this.rows && col - 1 >= 0 ? this.posObj(row+1, col-1) : undefined,
      left: col - 1 >= 0 ? { row: row, col: col - 1 } : undefined,
      //topLeft: col - 1 >= 0 && row - 1 >= 0 ? { row: row - 1, col: col - 1} : undefined,
      top: row - 1 >= 0 ? { row: row - 1, col: col } : undefined
      //topRight: row - 1 >= 0 && col + 1 < this.cols ? this.posObj(row-1, col+1) : undefined
    };
    return neighbours_obj;
  }

  bfs = () => {
    let queue = [{ pos: this.startPos, path: [this.startPos] }];
    while (queue.length > 0) {
      const { pos, path } = queue.shift();
      const neighbours = this.getNeighbours(pos);
      this.addToVisited(pos, StateMap.searched);
      for (const newPos of Object.values(neighbours)) {
        if (newPos !== undefined) {
          if (!this.shouldVisit(newPos)) {
            continue;
          }
          if (this.isTarget(newPos)) {
            console.log("Found at:", newPos);
            this.addPathToFlow(path);
            return { found: true, flow: this.flow };
          }
          queue.push({ pos: newPos, path: [...path, newPos] });
        }
      }
    }
    return undefined;
  };

  dfs = async () => {
    let queue = [{ pos: this.startPos, path: [this.startPos] }];
    while (queue.length > 0) {
      const { pos, path } = queue.pop();
      const neighbours = this.getNeighbours(pos);
      this.addToVisited(pos, StateMap.searched);
      for (const newPos of Object.values(neighbours)) {
        if (newPos !== undefined) {
          if (!this.shouldVisit(newPos)) {
            continue;
          }
          if (this.isTarget(newPos)) {
            console.log("Found at:", newPos);
            this.addPathToFlow(path);
            return { found: true, flow: this.flow };
          }
          queue.push({ pos: newPos, path: [...path, newPos] });
        }
      }
    }
    return undefined;
  };

  aStar = async () => {
    console.log("aStar");
  };

  dijkstra = async () => {
    let pq = [{ pos: this.startPos, path: [this.startPos], weight: 0 }]; //priority queue
    const add_to_pq = obj => {
      const weight = 1; //StateMap.weighted ===  obj.weight ? 11 : 1
      let inserted = false;
      for (let i = 0; i < pq.length; i++) {
        const weightInQ = pq[i].weight;
        if (weightInQ > weight) {
          //console.log("here2:", weightInQ)
          pq.splice(i, 0, obj);
          inserted = true;
          break;
        }
      }
      if (!inserted) {
        pq.push(obj);
      }
      //console.log(weight)
    };

    while (pq.length > 0) {
      const { pos, path, weight } = pq.shift();
      const neighbours = this.getNeighbours(pos);
      this.addToVisited(pos, StateMap.searched);
      for (const newPos of Object.values(neighbours)) {
        if (newPos !== undefined) {
          const thisWeight = this.grid[newPos.row][newPos.col];
          if (!this.shouldVisit(newPos)) {
            continue;
          }
          if (this.isTarget(newPos)) {
            console.log("Found at:", newPos);
            this.addPathToFlow(path);
            return { found: true, flow: this.flow };
          }
          console.log(weight, thisWeight, pos, newPos);
          add_to_pq({
            pos: newPos,
            path: [...path, newPos],
            weight: weight + thisWeight
          });
        }
      }
    }
    return undefined;
  };

  greedy = async () => {
    let pq = [{ pos: this.startPos, path: [this.startPos], weight: 0 }]; //priority queue
    const add_to_pq = (obj, row, col) => {
      //calc manhattan distance
      const m_distance =
        Math.abs(row - this.targetPos.row) + Math.abs(col - this.targetPos.col);
      let weight = StateMap.weighted === obj.weight ? 11 : 1;
      weight += m_distance;
      let inserted = false;
      for (let i = 0; i < pq.length; i++) {
        const thisWeight = pq[i].weight;
        if (weight <= thisWeight) {
          pq.splice(i, 0, obj);
          inserted = true;
          break;
        }
      }
      if (!inserted) {
        pq.push(obj);
      }
    };

    while (pq.length > 0) {
      const { pos, path } = pq.shift();
      const neighbours = this.getNeighbours(pos);
      this.addToVisited(pos, StateMap.searched);
      for (const newPos of Object.values(neighbours)) {
        if (newPos !== undefined) {
          const thisWeight = this.grid[newPos.row][newPos.col];
          if (!this.shouldVisit(newPos)) {
            continue;
          }
          if (this.isTarget(newPos)) {
            console.log("Found at:", newPos);
            this.addPathToFlow(path);
            return { found: true, flow: this.flow };
          }
          add_to_pq(
            { pos: newPos, path: [...path, newPos], weight: thisWeight },
            newPos.row,
            newPos.col
          );
        }
      }
    }
    return undefined;
  };

  runSearch(searchName) {
    const algs = this.getAlgorithms();
    return algs[searchName]();
  }

  getAlgorithms = () => {
    const algorithms = {
      "Breadth First Search": this.bfs,
      "Depth First Search": this.dfs,
      "A* Search": this.aStar,
      "Dijkstra's": this.dijkstra,
      Greedy: this.greedy
    };

    return algorithms;
  };

  static getAlgorithms = () => {
    const algorithms = {
      "Breadth First Search": this.bfs,
      "Depth First Search": this.dfs,
      "A* Search": this.aStar,
      "Dijkstra's": this.dijkstra,
      Greedy: this.greedy
    };
    return algorithms;
  };
}


module.exports = Search