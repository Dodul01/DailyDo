import React from 'react'
import waiting from '../../assets/waiting.gif';

const WaitingPage = () => {
    return (
        <div className='flex items-center justify-center flex-col h-screen'>
            <img className='h-[300px]' src={waiting} alt="" />
            <h1 className='text-center text-2xl'>Your Request is in process please wait...</h1>
        </div>
    )
}

export default WaitingPage