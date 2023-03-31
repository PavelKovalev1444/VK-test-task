import React from 'react'
import PropTypes from 'prop-types'

const MineCounter = (props) => {

    function makeNumber(){
        return (
            <div>
                <img src={require('./../../textures/timer_0.JPG')}/>
                <img src={require(`./../../textures/timer_${(props.mineCounter - props.mineCounter%10)/10}.JPG`)}/>
                <img src={require(`./../../textures/timer_${props.mineCounter%10}.JPG`)}/>
            </div>
        )
    }

    return (
        <div className='header-mine-counter'>
            {makeNumber()}
        </div>
    )
}

MineCounter.propTypes = {
    mineCounter: PropTypes.number
}

export default MineCounter