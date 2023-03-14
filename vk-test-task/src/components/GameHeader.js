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
                <MineCounter counter={props.counter}/>
            </div>
            <div className='header-smile'>
                <Smile />
            </div>
            <div className='header-timer'>
                <Timer counter={props.time}/>
            </div>
        </div>
    )
}

GameHeader.propTypes = {
    counter: PropTypes.number,
    time: PropTypes.number
}

export default GameHeader