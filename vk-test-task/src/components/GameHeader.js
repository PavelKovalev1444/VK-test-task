import React from 'react'
import PropTypes from 'prop-types'

import MineCounter from './header/MineCounter'
import Timer from './header/Timer'
import Smile from './header/Smile'

import '../styles/GameHeader.css'

const GameHeader = (props) => {

    return (
        <div className='header-content'>
            <div className='header-mines'>
                <MineCounter mineCounter={props.mineCounter}/>
            </div>
            <div className='header-smile'>
                <Smile 
                    isLose={props.isLose}
                    restartGame={props.restartGame}
                />
            </div>
            <div className='header-timer'>
                <Timer counter={props.time}/>
            </div>
        </div>
    )
}

GameHeader.propTypes = {
    isLose: PropTypes.bool,
    mineCounter: PropTypes.number,
    time: PropTypes.number,
    restartGame: PropTypes.func
}

export default GameHeader