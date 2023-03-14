import React, { useState, useEffect } from 'react'

import GameBody from './GameBody'
import GameHeader from './GameHeader'

import './../styles/Game.css'

const Game = () => {
    
    const [mineCounter, setMineCounter] = useState(40)
    
    return (
        <div className="sapper">
            <GameHeader counter={mineCounter} time={40}/>
            <GameBody />
        </div>
    )
}

export default Game;