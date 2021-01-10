import React from 'react'
import classes from './Tile.module.css'

const tile = (props) => {
    //Border styling
    const style = {}
    const position = props.pos.split(",")
    const rowIndex = position[0]
    const columnIndex = position[1]
    if (rowIndex === "2" || rowIndex === "5") {
        style.borderBottom = "solid 4px black"
    }
    if (columnIndex === "2" || columnIndex === "5") {
        style.borderRight = "solid 4px black"
    }

    return (
        <textarea 
        id={props.pos}
        onChange = {() => {}}
        disabled={props.shouldDisable}
        className={classes.tile} 
        style={style} 
        onKeyPress={props.keyPressed}
        value={props.children === 0 ? " ": props.children}></textarea>
    )
}

export default tile 