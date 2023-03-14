import React from 'react'
import PropTypes from 'prop-types'

const MineCounter = (props) => {

    function makeNumber(counter){
        return (
            <div>
                <img src={require('./../../textures/timer_0.JPG')}/>
                <img src={require(`./../../textures/timer_${(counter - counter%10)/10}.JPG`)}/>
                <img src={require(`./../../textures/timer_${counter%10}.JPG`)}/>
            </div>
        )
    }

    return (
        <div className='header-mine-counter'>
            {makeNumber(props.counter)}
        </div>
    )
}

MineCounter.propTypes = {
    counter: PropTypes.number
}

export default MineCounter