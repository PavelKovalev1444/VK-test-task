import React, { useState } from 'react'
import PropTypes from 'prop-types'

import '../styles/GameBody.css' 

const GameBody = () => {
    let array1 = []
    for(let i = 0; i < 16; i++){
        array1.push([])
        for(let j = 0; j < 16; j++){
            array1[i][j] = 0
        }
    }
    let array2 = []
    for(let i = 0; i < 16; i++){
        array2.push([])
        for(let j = 0; j < 16; j++){
            array2[i][j] = 0
        }
    }
    const [board, setBoard] = useState(array1)
    const [visibleBoard, setVisibleBoard] = useState(array2)
    const [isFirstClick, setIsFirstClick] = useState(false)
    const [isLose, setIsLose] = useState(false)

    function handleFirstClick(i, j) {
        setIsFirstClick(true)
        addBombs(i, j)
    }

    function addBombs(yStart, xStart){
        let bombs = 0
        for(let i = 0; i < 16; i++){
            for(let j = 0; j < 16; j++){
                let x = Math.floor(Math.random() * 16)
                let y = Math.floor(Math.random() * 16)
                if(x !== xStart && y !== yStart){
                    if(array1[y][x] !== 10){
                        if(bombs < 40){
                            array1[y][x] = 10
                            bombs++
                        }
                    }
                }
            }
        }
        setBoard(array1)
    }

    function updateBoard(i, j, num) {
        let tmpBoard = Array.from(board)
        tmpBoard[i][j] = num
        setBoard(tmpBoard)
    }

    function cellPressHandler(i, j){
        if(!isLose){
            if(!isFirstClick){
                handleFirstClick(i, j)
            }
            if(!visibleBoard[i][j]){
                console.log('countMinesAround')
                countMinesAround(i, j)
            }
        }
    }

    function showAllBombs(tmp, y, x) {
        for(let i = 0; i < 15; i++){
            for(let j = 0; j < 15; j++){
                if(board[i][j] === 10){
                    tmp[i][j] = 1
                }
            }
        }
        board[y][x] = 11
        setVisibleBoard(tmp)
        setIsLose(true)
    }

    function countMinesAround(i, j){
        let coords = []
        coords.push({i, j})
        let tmp = Array.from(visibleBoard)
        console.log(coords)
        while(coords.length){
            let curCoord = coords.pop()
            let num = 0
            
            if(curCoord.i >= 0 && curCoord.i <= 15 && curCoord.j >= 0 && curCoord.j <= 15){
                if(tmp[curCoord.i][curCoord.j] !== 1){
                    if(board[curCoord.i][curCoord.j] === 0){
                        if(curCoord.i + 1 < 16){
                            if(tmp[curCoord.i + 1][curCoord.j] !== 1){
                                if(board[curCoord.i + 1][curCoord.j] === 10){
                                    num++
                                }
                                if(curCoord.j + 1 < 16 && tmp[curCoord.i + 1][curCoord.j + 1] !== 1){
                                    if(board[curCoord.i + 1][curCoord.j + 1] === 10){
                                        num++
                                    }
                                }
                                if(curCoord.j - 1 >= 0 && tmp[curCoord.i + 1][curCoord.j - 1] !== 1){
                                    if(board[curCoord.i + 1][curCoord.j - 1] === 10){
                                        num++
                                    }
                                }
                            }
                        }

                        if(curCoord.i - 1 >= 0){
                            if(board[curCoord.i - 1][curCoord.j] === 10){
                                num++
                            }
                            if(curCoord.j + 1 < 16){
                                if(board[curCoord.i - 1][curCoord.j + 1] === 10){
                                    num++
                                }
                            }
                            if(curCoord.j - 1 >= 0){
                                if(board[curCoord.i - 1][curCoord.j - 1] === 10){
                                    num++
                                }
                            }
                        }

                        if(curCoord.j + 1 < 16){
                            if(board[curCoord.i][curCoord.j + 1] === 10){
                                num++
                            }
                        }

                        if(curCoord.j - 1 >= 0){
                            if(board[curCoord.i][curCoord.j - 1] === 10){
                                num++
                            }
                        }
                        tmp[curCoord.i][curCoord.j] = 1
                        updateBoard(curCoord.i, curCoord.j, num)
                        console.log('num = ', num)
                        console.log(tmp)
                        console.log(board)
                        console.log('=================')
                        if(num === 0){
                            coords.push({i: curCoord.i + 1, j: curCoord.j})
                            coords.push({i: curCoord.i + 1, j: curCoord.j + 1})
                            coords.push({i: curCoord.i + 1, j: curCoord.j - 1})

                            coords.push({i: curCoord.i - 1, j: curCoord.j})
                            coords.push({i: curCoord.i - 1, j: curCoord.j + 1})
                            coords.push({i: curCoord.i - 1, j: curCoord.j - 1})

                            coords.push({i: curCoord.i, j: curCoord.j + 1})
                            coords.push({i: curCoord.i, j: curCoord.j - 1})
                        }
                    }else{
                        console.log('Попал на мину')
                        console.log(curCoord)
                        console.log(board[curCoord.i][curCoord.j])
                        tmp[curCoord.i][curCoord.j] = 1
                        showAllBombs(tmp, curCoord.i, curCoord.j)
                        break;
                    }
                }
            }
        }
        setVisibleBoard(tmp)
    }

    function showVisibleCell(i, j) {
        switch(board[i][j]){
            case 1: // 1 mines around
                return <img src={require(`./../textures/${1}.JPG`)} onClick={()=>{cellPressHandler(i, j)}}/>
            case 2: // 2 mines around
                return <img src={require(`./../textures/${2}.JPG`)} onClick={()=>{cellPressHandler(i, j)}}/>
            case 3: // 3 mines around
                return <img src={require(`./../textures/${3}.JPG`)} onClick={()=>{cellPressHandler(i, j)}}/>
            case 4: // 4 mines around
                return <img src={require(`./../textures/${4}.JPG`)} onClick={()=>{cellPressHandler(i, j)}}/>
            case 5: // 5 mines around
                return <img src={require(`./../textures/${5}.JPG`)} onClick={()=>{cellPressHandler(i, j)}}/>
            case 6: // 6 mines around
                return <img src={require(`./../textures/${6}.JPG`)} onClick={()=>{cellPressHandler(i, j)}}/>
            case 7: // 7 mines around
                return <img src={require(`./../textures/${7}.JPG`)} onClick={()=>{cellPressHandler(i, j)}}/>
            case 8: // 8 mines around
                return <img src={require(`./../textures/${8}.JPG`)} onClick={()=>{cellPressHandler(i, j)}}/>
            case 9: // flag 
                return <img src={require(`./../textures/flag.JPG`)} onClick={()=>{cellPressHandler(i, j)}}/>
            case 10: // open a bomb
                return <img src={require('./../textures/bomb.JPG')} onClick={()=>{cellPressHandler(i, j)}}/>  
            case 11: // open a bomb
                return <img src={require('./../textures/explosed_mine.JPG')} onClick={()=>{cellPressHandler(i, j)}}/> 
            default:
                return <img src={require('./../textures/empty_cell.JPG')} onClick={()=>{cellPressHandler(i, j)}}/>    
        }
    }

    function cellType(i, j) {
        switch(visibleBoard[i][j]){
            case 0:
                return <img src={require('./../textures/cell.JPG')} onClick={()=>{cellPressHandler(i, j)}}/>
            case 1:
                return showVisibleCell(i, j)
        }
    }

    return (
        <div className='body-content'>
            {visibleBoard.map((row, i)=>{
                return (
                    <div key={i} className="row">
                        {row.map((col, j)=>{
                            return (
                                <div key={j} className="cell">
                                    {cellType(i, j)}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

GameBody.propTypes = {
}

export default GameBody