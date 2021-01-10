import React from 'react'
import classes from './Backdrop.module.css'

const backdrop = (props) => {
    return <div onClick={props.clicked} className={classes.backdrop}></div>
}

export default backdrop