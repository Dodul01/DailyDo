import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AppContext } from "../../AppContext/AppContextProvider";

const Nav = () => {
    const { currentUser, logOutUser } = useContext(AppContext);

    return (
        <div className='flex items-center justify-between p-4 bg-slate-50'>
            <div>
                <h1 className='text-2xl font-bold'> <span className='text-blue-600'>Daily</span>Do<span className='text-blue-600'>.</span></h1>
            </div>
            <div className='text-base flex items-center gap-10 text-gray-600 font-semibold'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/dashbord'>Dashbord</NavLink>
                <NavLink to='/joinAsCompany'>Join As Company</NavLink>
            </div>
            <div>
                {currentUser ?
                    <button onClick={()=> logOutUser()} className='bg-blue-600 text-white py-2 px-4 rounded-full text-lg font-semibold cursor-pointer'>Sign Out</button> :
                    <NavLink to='/signUp' className='bg-blue-600 text-white py-2 px-4 rounded-full text-lg font-semibold cursor-pointer'>
                        <button>Sign Up</button>
                    </NavLink>
                }
            </div>
        </div>
    )
}

export default Nav