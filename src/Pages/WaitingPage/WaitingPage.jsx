import React from 'react'
import waiting from '../../assets/waiting.gif';

const WaitingPage = () => {
    return (
        <div className='flex items-center justify-center flex-col h-[97vh]'>
            <img className='h-[300px]' src={waiting} alt="" />
            <h1 className='text-center text-3xl'>Your request is in process please wait...</h1>
        </div>
    )
}

export default WaitingPage