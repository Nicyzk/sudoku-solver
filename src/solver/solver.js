const findEmpty = (board) => {
    for (let i = 0; i <= 8; i++) {
        for (let j =0; j <= 8; j++) {
            if (board[i][j] === 0) {
                return [i, j]
            }
        }
    }

    return false
}

const possible = (board, pos, num) => {

    const [rowIndex, columnIndex] = pos

    //check horizontal row
    for (let i = 0; i <= 8; i++) {
        if (board[rowIndex][i] === num) {
            return false
        }
    } 

    //check vertical column
    for (let i = 0; i <= 8; i++) {
        if (board[i][columnIndex] === num) {
            return false
        }
    } 

    //check box 
    const boxStart = [Math.floor(rowIndex/3)*3, Math.floor(columnIndex/3)*3] 
    for (let i = boxStart[0]; i <= boxStart[0]+2; i++) {
        for (let j = boxStart[1]; j <= boxStart[1]+2; j++) {
            if (board[i][j] === num) {
                return false
            }
        }
    }

    return true
}  


const solve = (copyBoard, steps) => {
    const pos = findEmpty(copyBoard)
    if (!pos) {
        return true 
    } 
    for (let i = 1; i <= 9; i++) {
        if (possible(copyBoard, pos, i)) {
            copyBoard[pos[0]][pos[1]] = i
            steps.push([pos[0], pos[1], i])
            if (solve(copyBoard, steps)) {
                return true
            } else {
                copyBoard[pos[0]][pos[1]] = 0
                steps.push([pos[0], pos[1], 0])
            }
        }
    }

    return false

}

const solver = (copyBoard, steps) => {
    if (solve(copyBoard, steps)) {
        return steps
    } else {
        return false
    }
}


const makeCopy = (stateBoard) => {
    const copyBoard = [[], [], [], [], [], [], [], [], []]
    for (let i = 0; i <= 8; i++) {
        for (let j = 0; j <= 8; j++) {
            copyBoard[i].push(stateBoard[i][j])
        }
    }
    return copyBoard
}

export default {
    makeCopy,
    solve,
    solver,
    findEmpty,
    possible
}