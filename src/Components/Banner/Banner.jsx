import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <div className="flex items-center justify-center flex-col lg:h-[550px]">
            <h1 className="text-center text-7xl">Efficient Task <br /> Management App.</h1>
            <p className="text-2xl text-gray-600 font-semibold mt-4">Boost Your Productivity and Achiving Goals</p>
            <div className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full text-lg font-semibold cursor-pointer">
                <Link to='/SignUp'>Let's Explore</Link>
            </div>
        </div>
    )
}

export default Banner