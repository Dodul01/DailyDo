import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../../AppContext/AppContextProvider";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../firebase.config";

const SignUp = () => {
    const { signUpUser, googleSignIn } = useContext(AppContext);
    const navigate = useNavigate();
    const [companyes, setCompanyes] = useState([]);

    const handleSignUp = (e) => {
        const Form = e.target;

        e.preventDefault()

        const displayName = e.target.name.value;
        const companyName = Form.companye.value;
        const photoURL = e.target.ImageURL.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const phoneNumber = e.target.phone.value;
        const userRole = e.target.role.value;
        const isAdmin = false;

        const user = { displayName, companyName, photoURL, email, phoneNumber, userRole, isAdmin };

        // Validation
        if (!displayName || !companyName || !photoURL || !email || !password || !phoneNumber || !userRole) {
            return toast.error("Please fill in all fields.");
        } else if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long.");
        }

        signUpUser(email, password)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                })

                if (userCredential) {
                    fetch('http://localhost:5000/normalUser', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                toast.success('Account Created Sucessfully.')
                                navigate('/dashbord')
                            }
                        })
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage)
            })
    }


    const handleGoogleSignUp = () => {
        googleSignIn()
            .then((result) => {
                toast.success('Sign Up Sucessfully')
                navigate('/dashbord')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetch('http://localhost:5000/companyes')
            .then(res => res.json())
            .then(data => {
                setCompanyes(data);
                console.log(data);
            })
    }, [])

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex-1'>
                <h1 className='text-3xl font-bold text-center'> <span className='text-blue-600'>Daily</span>Do<span className='text-blue-600'>.</span></h1>
                <p className='text-center text-gray-600 text-lg font-semibold'>Manage Your Task Easily</p>
                <img className='w-full max-h-[500px] object-cover' src="https://i.ibb.co/TL9QKb3/Safe-pana.png" alt="" />
            </div>
            <div className='flex-1 p-4 flex items-center justify-center'>
                <form onSubmit={handleSignUp} className='bg-gray-50 flex flex-col p-3 rounded max-w-[450px] w-full border shadow'>
                    <h2 className='text-2xl font-bold text-center my-2'>Sign Up</h2>
                    <input className='border p-2 w-full my-2 rounded-lg outline-none' name='name' type="text" placeholder='Your Name' />
                    <input className='border p-2 w-full my-2 rounded-lg outline-none' name='ImageURL' type="text" placeholder='Your Image URL' />
                    <input className='border p-2 w-full my-2 rounded-lg outline-none' name='phone' type="tel" placeholder='Your Phone Number (+8801612345678)' />
                    <input className='border p-2 w-full my-2 rounded-lg outline-none' name='role' type="text" placeholder='Your role at company' />
                    <select className='border p-2 w-full my-2 rounded-lg outline-none' name="companye">
                        <option value="null">Select your company</option>
                        {
                            companyes.map((company) => {
                                return <option key={company?._id} value={`${company?.companyName}`}>{company?.companyName}</option>
                            })
                        }
                    </select>
                    <input className='border p-2 w-full my-2 rounded-lg outline-none' name='email' type="email" placeholder='example@gmail.com' />
                    <input className='border p-2 w-full my-2 rounded-lg outline-none' name='password' type="password" placeholder='Password' />
                    <input className='bg-blue-600 text-lg rounded-lg py-1 text-white cursor-pointer' type="submit" value='Sign Up' />
                    <p className='my-4'>Already have an account? <Link to='/signIn' className='font-semibold underline text-blue-600'>Sign In</Link></p>
                    {/* <hr />
                    <p className='text-gray-600 text-center my-2'>Continue With</p>
                    <button onClick={handleGoogleSignUp} className='text-lg font-semibold border border-blue-600 rounded-lg py-1 text-blue-600 hover:bg-blue-600 hover:text-white transition-all'>Google</button> */}
                </form>
            </div>
        </div>
    )
}

export default SignUp