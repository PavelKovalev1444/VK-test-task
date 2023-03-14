import React from 'react'
import PropTypes from 'prop-types'

const Timer = (props) => {

    function makeNumber(time){
        let res = <img src={require('./../../textures/timer_0.JPG')}/>
        //res += <img src={require(`./../../textures/timer_${time/10}.JPG`)}/>
        //res += <img src={require(`./../../textures/timer_${time%10}.JPG`)}/>
        return res
    }

    return (
        <div className='header-timer'>
            {makeNumber(props.time)}
        </div>
    )
}

Timer.propTypes = {
    time: PropTypes.number
}

export default Timer