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
                <div>
                    <div className='absolute top-14 lg:left-4 md:left-4 left-2'>
                        <div className='border-8 border-white rounded-lg'>
                            <img className='h-[150px] w-[150px] object-cover' src={currentUser?.photoURL} alt="" />
                        </div>
                    </div>

                    <div className='absolute lg:top-16 md:top-16 top-56 lg:left-48 md:left-48 left-2'>
                        <h1 className='lg:text-2xl md:text-2xl text-xl font-semibold lg:text-white md:text-white text-black'>{currentUser?.displayName}</h1>
                        <div className='flex gap-2 lg:text-white md:text-white text-black lg:text-lg md:text-lg text-sm'>
                            <p>{user?.userRole}</p> |
                            <p>{user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>

            </div>
        </div>
    )
}

export default Profile