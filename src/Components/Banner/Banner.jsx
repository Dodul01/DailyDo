import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <div className="flex items-center justify-center flex-col lg:h-[550px]">
            <h1 className="text-center lg:text-7xl md:text-5xl text-4xl lg:mt-0 mt-20">Efficient Task <br /> Management App.</h1>
            <p className="text-2xl text-gray-600 text-center lg:font-semibold md:font-normal font-normal mt-4">Boost Your Productivity and Achieving Goals</p>
            <div className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full text-lg font-semibold cursor-pointer">
                <Link to='/SignUp'>Let's Explore</Link>
            </div>
        </div>
    )
}

export default Banner