// import { useContext } from "react"
// import { NavLink } from "react-router-dom"
// import { AppContext } from "../../AppContext/AppContextProvider";

// const Nav = () => {
// const { currentUser, logOutUser } = useContext(AppContext);

//     return (
//         <div className='flex items-center justify-between p-4 bg-slate-50'>
//             <div>
//                 <h1 className='text-2xl font-bold'> <span className='text-blue-600'>Daily</span>Do<span className='text-blue-600'>.</span></h1>
//             </div>
//             <div className='text-base flex items-center gap-10 text-gray-600 font-semibold sm:hidden'>
//                 <NavLink to='/'>Home</NavLink>
//                 <NavLink to='/dashbord'>Dashbord</NavLink>
//                 <NavLink to='/joinAsCompany'>Join As Company</NavLink>
//             </div>
//             <div>
//                 {currentUser ?
//                     <button onClick={()=> logOutUser()} className='bg-blue-600 text-white py-2 px-4 rounded-full text-lg font-semibold cursor-pointer'>Sign Out</button> :
//                     <NavLink to='/signUp' className='bg-blue-600 text-white py-2 px-4 rounded-full text-lg font-semibold cursor-pointer'>
//                         <button>Sign Up</button>
//                     </NavLink>
//                 }
//             </div>
//         </div>
//     )
// }

// export default Nav



import React, { useContext, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { BsFillMenuButtonWideFill } from 'react-icons/bs'
import { AppContext } from "../../AppContext/AppContextProvider";

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser, logOutUser } = useContext(AppContext);

    return (
        <div className='bg-slate-50 z-40 py-4 px-2'>
            <nav className='fixed left-0 top-0 z-40 bg-slate-50 w-full'>
                <div className='flex item-center justify-between max-w-7xl mx-auto p-2'>
                    <div className='flex  items-center'>
                        <h1 className='text-2xl font-bold'> <span className='text-blue-600'>Daily</span>Do<span className='text-blue-600'>.</span></h1>

                    </div>
                    <div className='md:flex md:items-center hidden text-base items-center gap-10 text-gray-600 font-semibold'>
                        <NavLink className='hover:text-blue-600 transition-all' to='/'>Home</NavLink>
                        <NavLink className='hover:text-blue-600 transition-all' to='/dashbord'>Dashbord</NavLink>
                        <NavLink className='hover:text-blue-600 transition-all' to='/joinAsCompany'>Join As Company</NavLink>
                    </div>
                    <div className='md:flex items-center justify-center hidden'>
                        {currentUser ?
                            <button onClick={() => logOutUser()} className='bg-blue-600 text-white py-2 px-4 rounded-full text-lg font-semibold cursor-pointer'>Sign Out</button> :
                            <NavLink to='/signUp' className='bg-blue-600 text-white py-2 px-4 rounded-full text-lg font-semibold cursor-pointer'>
                                <button>Sign Up</button>
                            </NavLink>
                        }
                    </div>
                    {/* Mobile Menu */}
                    <div onClick={() => setIsMenuOpen(!isMenuOpen)} className='md:hidden flex'>
                        <BsFillMenuButtonWideFill className='text-2xl cursor-pointer' />
                    </div>

                    <div className={`md:hidden flex flex-col text-base items-center gap-10 text-gray-600 font-semibold absolute top-12 ${isMenuOpen ? 'left-0' : 'left-[-100%]'} bg-white pb-5 transition-all w-[100%] p-2`}>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/dashbord'>Dashbord</NavLink>
                        <NavLink to='/joinAsCompany'>Join As Company</NavLink>
                        {currentUser ?
                            <button onClick={() => logOutUser()} className='bg-blue-600 text-white py-2 px-4 rounded-full text-lg font-semibold cursor-pointer'>Sign Out</button> :
                            <NavLink to='/signUp' className='bg-blue-600 text-white py-2 px-4 rounded-full text-lg font-semibold cursor-pointer'>
                                <button>Sign Up</button>
                            </NavLink>
                        }
                    </div>
                </div>

            </nav>
        </div>
    )
}

export default Nav




