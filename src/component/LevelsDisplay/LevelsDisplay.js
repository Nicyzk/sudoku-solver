import React from 'react'
import LevelsButton from '../Button/LevelsButton/LevelsButton'
import Backdrop from '../UI/Backdrop/Backdrop'
import classes from './LevelsDisplay.module.css'

const levelsDisplay = (props) => {
    return (
        <React.Fragment>
            <Backdrop clicked={props.backdropClicked}></Backdrop>
            <div className={classes.display}>
                <h1>Select Level</h1>
                <div className={classes.levelsBox}>
                    <LevelsButton clicked={() => props.levelSelectClicked(1)}>1</LevelsButton>
                    <LevelsButton clicked={() => props.levelSelectClicked(2)}>2</LevelsButton>
                    <LevelsButton clicked={() => props.levelSelectClicked(3)}>3</LevelsButton>
                </div>
            </div>
        </React.Fragment>
    )
}

export default levelsDisplay