import React from 'react'
import PropTypes from 'prop-types'

const Smile = (props) => {

    function getSmileType() {
        if(props.isLose){
            return 'smile_dead.JPG'
        }else if(!props.isLose){
            return 'smile_laughing.JPG'
        }
    }

    return (
        <div 
            className='header-smile' 
            onClick={() => {props.restartGame()}}
        >
            <img src={require(`./../../textures/${getSmileType()}`)} alt=""/>
        </div>
    )
}

Smile.propTypes = {
    isLose: PropTypes.bool,
    restartGame: PropTypes.func
}

export default Smile