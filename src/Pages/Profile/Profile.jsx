import { useContext, useEffect, useState } from 'react';
import mountain from '../../assets/mountain.jpg';
import { AppContext } from '../../AppContext/AppContextProvider';

const Profile = () => {
    const { currentUser } = useContext(AppContext);
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch('http://localhost:5000/allUsers')
            .then(req => req.json())
            .then(res => {
                const data = res.find(person => person.email === currentUser.email)
                setUser(data);
            })
    }, [])

    return (
        <div>
            <div className='relative'>
                <img className='w-full h-[150px] object-cover rounded-lg' src={mountain} alt="mountain" />
                <div className='absolute top-14 left-4'>
                    <div className='border-8 border-white rounded-lg'>
                        <img className='h-[150px] w-[150px] object-cover' src={currentUser?.photoURL} alt="" />
                    </div>
                </div>
                <div className='absolute top-16 left-48'>
                    <h1 className='text-2xl font-semibold text-white'>{currentUser?.displayName}</h1>
                    <div className='flex gap-2 text-white text-lg'>
                        <p>{user?.userRole}</p> |
                        <p>{user?.email}</p>
                    </div>
                </div>
            </div>

            <div>

            </div>
        </div>
    )
}

export default Profile