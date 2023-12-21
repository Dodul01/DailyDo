import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../../AppContext/AppContextProvider";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

const SignUp = () => {
    const { signUpUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        const Form = e.target;

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const imageURL = e.target.ImageURL.value;

        signUpUser(email, password)
            .then((userCredential) => {

                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: imageURL
                })
                    .then(userAccount => {
                        toast.success('Account Created Sucessfully');
                        navigate('/dashbord')
                    })
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage)
            })
        e.preventDefault();
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex-1'>
                <h2 className='text-3xl font-semibold text-center'>DailyDo.</h2>
                <p className='text-center text-gray-600 text-lg font-semibold'>Manage Your Task Easily</p>
                <img className='w-full max-h-[500px] object-cover' src="https://i.ibb.co/TL9QKb3/Safe-pana.png" alt="" />
            </div>
            <div className='flex-1 p-4 flex items-center justify-center'>
                <form onSubmit={handleSignUp} className='bg-gray-50 flex flex-col p-3 rounded max-w-[450px] w-full shadow'>
                    <h2 className='text-2xl font-bold text-center my-2'>Sign Up</h2>
                    <input className='border p-2 w-full my-2 rounded-lg outline-none' name='name' type="text" placeholder='Your Name' />
                    <input className='border p-2 w-full my-2 rounded-lg outline-none' name='ImageURL' type="text" placeholder='Your Image URL' />
                    <input className='border p-2 w-full my-2 rounded-lg outline-none' name='email' type="email" placeholder='example@gmail.com' />
                    <input className='border p-2 w-full my-2 rounded-lg outline-none' name='password' type="password" placeholder='Password' />
                    <input className='bg-blue-600 text-lg rounded-lg py-1 text-white cursor-pointer' type="submit" value='Sign Up' />
                    <p className='my-4'>Already have an account? <Link to='/signIn' className='font-semibold underline text-blue-600'>Sign In</Link></p>
                    <hr />
                    <p className='text-gray-600 text-center my-2'>Continue With</p>
                    <button className='text-lg font-semibold border border-blue-600 rounded-lg py-1 text-blue-600 hover:bg-blue-600 hover:text-white transition-all'>Google</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp