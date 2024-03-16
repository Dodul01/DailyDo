import { useContext } from "react";
import { AppContext } from "../../AppContext/AppContextProvider";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../firebase.config";
import { useNavigate } from "react-router-dom";

const SignUpAsCompany = () => {
    const { signUpUser } = useContext(AppContext);
    const navigate = useNavigate()

    const handleJoinAsCompanyForm = (e) => {
        const Form = e.target;
        const displayName = Form.name.value;
        const companyName = Form.company_name.value;
        const photoURL = Form.image_link.value;
        const email = Form.email_address.value;
        const password = Form.password.value;
        const phoneNumber = Form.floating_phone.value;
        const userRole = Form.user_role.value;
        const isAdmin = true;
        const isVerifyed = true;

        signUpUser(email, password)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: displayName,
                    photoURL: photoURL,
                })

                if (userCredential) {
                    const user = { displayName, companyName, photoURL, email: userCredential.user.email, phoneNumber, userRole, isAdmin, isVerifyed };

                    fetch('http://localhost:5000/users', {
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
                toast.error(errorMessage);
            })
        e.preventDefault();
        Form.reset()
    }

    return (
        <div className='flex items-center justify-between w-full h-screen bg-slate-50'>
            <div className="flex-1 lg:block hidden">
                <h1 className='text-3xl font-bold text-center'> <span className='text-blue-600'>Daily</span>Do<span className='text-blue-600'>.</span></h1>
                <p className='text-center text-gray-600 text-lg font-semibold'>Manage Team Easily</p>
                <img className='w-full max-h-[500px] object-cover' src="https://i.ibb.co/TL9QKb3/Safe-pana.png" alt="" />
            </div>

            <div className="flex-1">
                <div className="lg:hidden block">
                    <h1 className='text-3xl font-bold text-center'> <span className='text-blue-600'>Daily</span>Do<span className='text-blue-600'>.</span></h1>
                    <p className='text-center text-gray-600 text-lg font-semibold'>Join As Company</p>
                </div>
                <form onSubmit={handleJoinAsCompanyForm} className="max-w-md mx-auto p-2">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="company_name" id="company_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="image_link" name="image_link" id="image_link" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Image Link</label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="email" name="email_address" id="email_address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="tel" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="user_role" id="user_role" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Role</label>
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto lg:w-full  px-5 py-2.5 text-center">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default SignUpAsCompany