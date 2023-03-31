import React, { useState } from 'react'

import GameBody from './GameBody'
import GameHeader from './GameHeader'

import './../styles/Game.css'

const Game = () => {
    const [mineCounter, setMineCounter] = useState(40)
    //const [smileType, setSmileType] = useState('smile_laughing.JPG')
    const [isLose, setIsLose] = useState(false)

    function changeMineCounter(mine) {
        setMineCounter((prevState, prevProps) => {
            return prevState + mine
        })
    }

    function changeIsLose(flag) {
        setIsLose(flag)
    }

    function restartGame() {
        setMineCounter(40)
        setIsLose(false)
    }
    /*
    function changeBoard(board) {
        setBoard(board)
    }

    function changeVisibleBoard(board) {
        setVisibleBoard(board)
    }
    */
    return (
        <div className="sapper">
            <GameHeader 
                mineCounter={mineCounter} 
                time={40} 
                isLose={isLose}
                restartGame={restartGame}
            />
            <GameBody 
                changeMineCounter={changeMineCounter} 
                mineCounter={mineCounter}
                isLose={isLose}
                setIsLose={changeIsLose}
            />
        </div>
    )
}

export default Game;