import React, { useState } from 'react'

import '../styles/GameBody.css' 

const GameBody = () => {
    let arrayWithBombs = [] // Реальное поле с бомбами
    for(let i = 0; i < 16; i++){
        arrayWithBombs.push([])
        for(let j = 0; j < 16; j++){
            arrayWithBombs[i][j] = 0
        }
    }
    let arrayWithMasks = [] // Массив с маской для сокрытия значений ячеек поля с бомбами
    for(let i = 0; i < 16; i++){
        arrayWithMasks.push([])
        for(let j = 0; j < 16; j++){
            arrayWithMasks[i][j] = 0
        }
    }
    const [board, setBoard] = useState(arrayWithBombs)
    const [visibleBoard, setVisibleBoard] = useState(arrayWithMasks)
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
                    if(arrayWithBombs[y][x] !== 10){
                        if(bombs < 40){
                            arrayWithBombs[y][x] = 10
                            bombs++
                        }
                    }
                }
            }
        }
        setBoard(arrayWithBombs)
    }
    
    //console.log('isFirstClick = ', isFirstClick)

    function updateBoard(i, j, num) {
        //let tmpBoard = Array.from(board)
        //tmpBoard[i][j] = num
        setBoard((prevState, prevProps) => {
            const newBoard = JSON.parse(JSON.stringify(prevState))
            newBoard[i][j] = num
            return newBoard
        })
    }

    function cellPressHandler(i, j){
        if(!isLose){
            if(!isFirstClick){
                handleFirstClick(i, j)
                //console.log('initialization')
            }
            console.log('board = ', board)
            if(!visibleBoard[i][j]){
                countMinesAround(i, j)
            }
        }
    }

    function showAllBombs(tmp, y, x) {
        for(let i = 0; i < 16; i++){
            for(let j = 0; j < 16; j++){
                if(board[i][j] === 10){
                    tmp[i][j] = 1
                }
            }
        }
        board[y][x] = 11 // Explosed mine
        setVisibleBoard(tmp)
        setIsLose(true)
    }

    function countMinesAround(i, j){
        let tmpVisibleBoard = JSON.parse(JSON.stringify(visibleBoard))
        if(board[i][j] === 10){
            tmpVisibleBoard[i][j] = 1
            showAllBombs(tmpVisibleBoard, i, j)
        }else{
            let coords = []
            coords.push({i, j})
            while(coords.length){
                let curCoord = coords.pop()
                let num = 0
                if(curCoord.i >= 0 && curCoord.i < 16 && curCoord.j >= 0 && curCoord.j < 16){
                    if(tmpVisibleBoard[curCoord.i][curCoord.j] !== 1){ // Если уже открыли эту ячейку
                        if(board[curCoord.i][curCoord.j] === 0){
                            if(curCoord.i + 1 < 16){
                                if(board[curCoord.i + 1][curCoord.j] === 10){
                                    num++
                                }
                                if(curCoord.j + 1 < 16){
                                    if(board[curCoord.i + 1][curCoord.j + 1] === 10){
                                        num++
                                    }
                                }
                                if(curCoord.j - 1 >= 0){
                                    if(board[curCoord.i + 1][curCoord.j - 1] === 10){
                                        num++
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

                            tmpVisibleBoard[curCoord.i][curCoord.j] = 1
                            if(num === 0){
                                coords.push({i: curCoord.i + 1, j: curCoord.j})
                                coords.push({i: curCoord.i + 1, j: curCoord.j + 1})
                                coords.push({i: curCoord.i + 1, j: curCoord.j - 1})

                                coords.push({i: curCoord.i - 1, j: curCoord.j})
                                coords.push({i: curCoord.i - 1, j: curCoord.j + 1})
                                coords.push({i: curCoord.i - 1, j: curCoord.j - 1})

                                coords.push({i: curCoord.i, j: curCoord.j + 1})
                                coords.push({i: curCoord.i, j: curCoord.j - 1})
                            }else{
                                updateBoard(curCoord.i, curCoord.j, num)
                            }
                        }
                    }
                }
            }
            setVisibleBoard(tmpVisibleBoard)
        }
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
            case 10: // unexplosed bomb
                return <img src={require('./../textures/bomb.JPG')} onClick={()=>{cellPressHandler(i, j)}}/>  
            case 11: // explosed bomb
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