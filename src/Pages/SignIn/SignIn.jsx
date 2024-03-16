import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../AppContext/AppContextProvider'
import toast from 'react-hot-toast';

const SignIn = () => {
    const { signInUser, googleSignIn } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        const Form = e.target;

        const email = Form.email.value;
        const password = Form.password.value;

        signInUser(email, password)
            .then((userCredential) => {
                toast.success('Log In Succesfully.')
                navigate('/dashbord')
            })
            .catch((error) => {
                toast.error(error)
                console.log(error);
            })
    }


    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex-1 lg:block md:block hidden'>
                <h1 className='text-3xl font-bold text-center'> <span className='text-blue-600'>Daily</span>Do<span className='text-blue-600'>.</span></h1>
                <p className='text-center text-gray-600 text-lg font-semibold'>Manage Your Task Easily</p>
                <img className='w-full max-h-[500px] object-cover' src="https://i.ibb.co/TL9QKb3/Safe-pana.png" alt="" />
            </div>
            <div className='flex-1 p-4 flex items-center justify-center'>
                <form onSubmit={handleSignIn} className='bg-gray-50 flex flex-col p-3 rounded max-w-[450px] w-full shadow'>
                    <h2 className='text-2xl font-bold text-center my-2'>Sign In</h2>
                    <input className='border p-2 w-full my-2 rounded-lg outline-none' name='email' type="email" placeholder='example@gmail.com' />
                    <input className='border p-2 w-full my-2 rounded-lg outline-none' name='password' type="password" placeholder='Password' />
                    <input className='bg-blue-600 text-lg rounded-lg py-1 text-white cursor-pointer' type="submit" value='Sign In' />
                    <p className='my-4'>Already have an account? <Link to='/signUp' className='font-semibold underline text-blue-600'>Sign Up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default SignIn