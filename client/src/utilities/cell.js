import CellState from "./cellState"

class Cell {
    constructor(row, col) {
        // isBasic isBlocked isTarget isStart isSearched
        this.pos = {row: row, col: col}
        this.state =  new CellState()
        this.possibleStates = this.state.getPossibleStates()
    }

    getPossibleStates() {
        return this.possibleStates
    }

    changeState(to) {
        switch (to) {
            // fixed states
            case this.possibleStates.isStart:
                if (this.state.isStart) {
                    this.makeBasic()
                } else {
                    this.makeStart()
                }
                break
            case this.possibleStates.isTarget:
                if (this.state.isTarget) {
                    this.makeBasic()
                } else {
                    this.makeTarget()
                }
                break
            case this.possibleStates.isBlocked:
                if (this.state.isBlocked) {
                    this.makeBasic()
                } else {
                    this.makeBlocked()
                }
                break
            // search states
            case this.possibleStates.isBasic:
                this.makeBasic()
                break
            case this.possibleStates.isSearched: 
                this.makeSearched()
                break;
            default:
                console.log("there is no attribute with that name")
                break;
        }
    }

    isEqualTo(cell) {
        return this.areEqual(this.state, cell.state)
    }

    areEqual(state1, state2) {
        return state1.isEqualTo(state2)
    }

    isBasic() {
        return this.state.isBasic
    }

    makeBasic() {
        this.state.makeBasic()
    }

    isBlocked() {
        return this.state.isBlocked
    }

    makeBlocked() {
        this.state.makeBlocked()
    }

    isTarget() {
        return this.state.isTarget
    }

    makeTarget() {
        this.state.makeTarget()
    }

    isStart() {
        return this.state.isStart
    }

    makeStart() {
        this.state.makeStart()
    }

    isSearched() {
        return this.state.isSearched
    }

    makeSearched() {
        this.state.makeSearched()
    }


}

export default Cell