import React, { Component } from 'react'
import sudokuSolver from '../solver/solver'
import Tile from '../component/Tile/Tile'
import classes from './SudokuBoard.module.css'
import MenuButton from '../component/Button/MenuButton/MenuButton'
import LevelsDisplay from '../component/LevelsDisplay/LevelsDisplay'
import puzzles from '../puzzles/puzzles'


class SudokuBoard extends Component {
    state = {
        board: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        boardOnLastCheck: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        ansBoard: [],
        steps: [],
        solving: false,
        levelDisplayShow: false,
        currentLevel: null,
        errorCount: 0,
        timerStart: false,
        timeStarted: null,
        timeElapsed: "00:00"
    }

    changeLevelsClickedHandler = () => {
        this.setState({
            levelDisplayShow: true
        })
    }

    backdropClickedHandler = () => {
        if (this.state.currentLevel !== null) { //if on mount, no level selected, cannot remove level display
            this.setState({
                levelDisplayShow:false
            })
        }
    }

    levelSelectHandler = (level) => {
        if (level === this.state.currentLevel) {
            this.setState({
                levelDisplayShow: false
            })
        } else {
            //import board, solve for steps, create ans board
            const boardNumber = "board-" + level
            const copy1 = sudokuSolver.makeCopy(puzzles[boardNumber])
            const copy2 = sudokuSolver.makeCopy(copy1)
            const copy3 = sudokuSolver.makeCopy(copy1)
            const stepsArr = []
            const steps = sudokuSolver.solver(copy2, stepsArr)
            this.setState({
                board: copy1,
                boardOnLastCheck: copy3,
                ansBoard: copy2,
                steps: steps,
                currentLevel: level,
                levelDisplayShow: false,
                timerStart: true,
                timeStarted: Date.now()/1000
            })
        }
    }

    solveClickedHandler = () => {
        this.setState({
            solving: true,
            timerStart: false
        })
    }



    tileEditHandler = (event, pos) => {  //will only work on tiles with 0
        const input = parseInt(String.fromCharCode(event.charCode))
        if (input >= 0 && input <= 9) {
            const position = pos.split(",")
            const rowIndex = position[0]
            const columnIndex = position[1]
            const copy = sudokuSolver.makeCopy(this.state.board)
            copy[rowIndex][columnIndex] = input
            this.setState({
                board: copy
            })
        }
    }

    checkClickedHandler = () => {
        const board = this.state.board
        //if board fully solved
        let fullySolved = true
        for (let i = 0; i <= 8; i++) {
            for (let j = 0; j <= 8; j++) {
                if (board[i][j] !== this.state.ansBoard[i][j]) {
                    fullySolved = false
                }
            }
        } 
        if (fullySolved) {
            this.setState({
                boardOnLastCheck: board,
                timerStart: false
            })
            return
        }
        //compare ansboard vs board to get array of incorrect answer and update board
        const incorrectAnsPos = []
        let errorCount
        for (let i = 0; i <= 8; i++) {
            for (let j = 0; j <= 8; j++) {
                if (board[i][j] !== this.state.ansBoard[i][j] && board[i][j] !== 0) {
                    incorrectAnsPos.push(`${i},${j}`)
                    board[i][j] = 0
                }
            }
        }
        errorCount = incorrectAnsPos.length + this.state.errorCount
        //compare updated board with only correct ans and board on last check
        const correctAnsPos = []
        for (let i = 0; i <= 8; i++) {
            for (let j = 0; j <= 8; j++) {
                if (board[i][j] !== this.state.boardOnLastCheck[i][j]) {
                    correctAnsPos.push(`${i},${j}`)
                }
            }
        }
        //animation 
        for (let i = 0; i < incorrectAnsPos.length; i++){
            document.getElementById(incorrectAnsPos[i]).animate([
                {backgroundColor: "white", offset: 0},
                {backgroundColor: "red", offset: 0.5},
                {backgroundColor: "white", offset: 1}
            ], {
                duration: 1000,
                iterations: 1
            })
        }

        for (let i = 0; i < correctAnsPos.length; i++){
            document.getElementById(correctAnsPos[i]).animate([
                {backgroundColor: "white", offset: 0},
                {backgroundColor: "springgreen", offset: 0.5},
                {backgroundColor: "white", offset: 1}
            ], {
                duration: 1000,
                iterations: 1
            })
        }

        this.setState({
            board: board,
            boardOnLastCheck: board,
            errorCount: errorCount
        })
    }


    componentDidMount () {
        this.setState({
            levelDisplayShow: true
        })
    }

    componentDidUpdate () {

        if (this.state.timerStart) {
            setTimeout(() => {

                // Important!: to prevent the two timeouts from overlapping i.e. this timer from updating even though solve has been pressed
                if (!this.state.timerStart) {
                    return
                }
                //

                const timeElapsed = Date.now()/1000 - this.state.timeStarted
                let minutes
                let seconds
                if (timeElapsed/60 < 10) {
                    minutes = "0" + Math.floor(timeElapsed/60)
                } else {
                    minutes = Math.floor(timeElapsed/60).toString()
                }
                if ((timeElapsed - Math.floor(timeElapsed/60)*60 ) < 10) {
                    seconds = "0" + Math.floor(timeElapsed - Math.floor(timeElapsed/60)*60)
                } else {
                    seconds = Math.floor(timeElapsed - Math.floor(timeElapsed/60)*60).toString()
                }
                const timeElapsedString = minutes + ":" + seconds
                this.setState({
                    timeElapsed: timeElapsedString
                }) 
            }, 1000)
        }



        if (this.state.solving && this.state.steps.length > 0) {
            setTimeout(() => {
                const steps = this.state.steps
                const board = this.state.board
                const currentStep = steps.shift()

                board[currentStep[0]][currentStep[1]] = currentStep[2]
                this.setState({
                    board: board,
                    boardOnLastCheck: board,
                    steps: steps
                })
            }, 1)
        } else if (this.state.solving && this.state.steps.length === 0) {
            this.setState({
                solving: false
            })
        }
    }

    render () {
        //render board
        const numPos = []// [{num: 0, pos: "0, 0"},...]
        for (let i = 0; i <= 8; i++) {
            for (let j = 0; j <= 8; j++) {
                numPos.push({num: this.state.board[i][j], pos: `${i},${j}`})
            }
        }
        const tiles = numPos.map(t => {
            const position = t.pos.split(",")
            const rowIndex = position[0]
            const columnIndex = position[1]
            let shouldDisable = false
            if (t.num !== 0 && t.num === this.state.boardOnLastCheck[rowIndex][columnIndex]) {
                shouldDisable = true
            }
            return <Tile 
            shouldDisable={shouldDisable}
            pos={t.pos} 
            key={t.pos} 
            keyPressed={(event) => this.tileEditHandler(event, t.pos)}>{t.num}</Tile>
        })

        return (
            <React.Fragment>
                {this.state.levelDisplayShow ? <LevelsDisplay 
                levelSelectClicked={this.levelSelectHandler}
                backdropClicked={this.backdropClickedHandler}/> : null}

                <header className={classes.title}>Sudoku Game</header>
                <main className={classes.main}>
                    <div className={classes.buttonDiv}>
                        <MenuButton 
                        clicked={this.changeLevelsClickedHandler}
                        shouldDisable={this.state.solving}>Level #{this.state.currentLevel}</MenuButton>
                        <MenuButton 
                        clicked={this.checkClickedHandler}
                        shouldDisable={this.state.solving}>Check</MenuButton>
                        <MenuButton 
                        clicked={this.solveClickedHandler}
                        shouldDisable={this.state.solving}>Solve</MenuButton>
                    </div>
                    <div className={classes.board}>
                        {tiles}
                    </div>
                    <div className={classes.footer}>
                        <div className={classes.footerItem + " " + classes.footerChangeMode}>
                            <i className="fa fa-arrow-left"></i> Change Mode</div>
                        <div className={classes.footerItem}>Error Count: {this.state.errorCount}</div>
                        <div className={classes.footerItem}>Timing {this.state.timeElapsed !== "00:00" ? this.state.timeElapsed: "00:00"}</div>
                    </div>
                </main>

            </React.Fragment>
        )
    }

}

export default SudokuBoard