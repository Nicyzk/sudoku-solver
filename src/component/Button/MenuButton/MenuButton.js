import React from 'react'
import classes from './MenuButton.module.css'

const menuButton = (props) => {
    return (
        <button 
        disabled={props.shouldDisable}
        onClick={props.clicked} 
        className={classes.button}>{props.children}</button>
    )
}

export default menuButton