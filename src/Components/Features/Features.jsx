import React from 'react'
import dashbordDemo from '../../assets/dashbord-demo.png';

const Features = () => {
    return (
        <div className='flex items-center justify-center flex-col'>
            <h2 className='text-center mb-5 text-3xl font-semibold'>Easy To Use</h2>
            <img className='rounded-3xl border-2 object-contain' src={dashbordDemo} alt="" />
        </div>
    )
}

export default Features