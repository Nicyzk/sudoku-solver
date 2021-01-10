import React from 'react'
import classes from './LevelsButton.module.css'

const LevelsButton = (props) => {
    return (
        <button onClick={props.clicked}className={classes.levelsButton}>{props.children}</button>
    )
}

export default LevelsButton