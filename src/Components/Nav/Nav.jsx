import { NavLink } from "react-router-dom"

const Nav = () => {
    return (
        <div className='flex items-center justify-between p-4 bg-slate-50'>
            <div>
                <h1 className='text-2xl font-bold'>DailyDo<span className='text-blue-600'>.</span></h1>
            </div>
            <div className='text-base flex items-center gap-10 text-gray-600 font-semibold'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/dashbord'>Dashbord</NavLink>
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/contactUs'>Contact</NavLink>
            </div>
            <div>
                <NavLink to='/signUp' className='bg-blue-600 text-white py-2 px-4 rounded-full text-lg font-semibold cursor-pointer'>
                    <button>Sign Up</button>
                </NavLink>
            </div>
        </div>
    )
}

export default Nav