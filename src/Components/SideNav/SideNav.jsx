import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext/AppContextProvider";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { LuLayoutGrid } from "react-icons/lu";
import { FaPowerOff } from "react-icons/fa";
import { AiOutlineTeam, AiOutlineFileDone, AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoChatbubblesSharp } from "react-icons/io5";
import { GoProjectSymlink } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

const SideNav = () => {
    const { logOutUser, currentUser } = useContext(AppContext);
    const [user, setUser] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/allUsers')
            .then(req => req.json())
            .then(res => {
                const user = res.find(member => member.email == currentUser.email)
                setUser(user);
            })
    })


    return (
        <div>
            {/* dasktop menu */}
            <div className='lg:block md:hidden hidden w-[250px] lg:h-[98vh] bg-slate-50 border-r-2'>
                <h1 className='text-2xl font-bold text-center my-2'> <span className='text-blue-600'>Daily</span>Do<span className='text-blue-600'>.</span></h1>
                <h2 className="text-xl font-semibold text-center mb-5 text-gray-600">Task Manager</h2>
                <div>
                    <Link to='/dashbord'>
                        <div className="flex gap-2 items-center text-lg font-semibold cursor-pointer p-2 mx-1 rounded-lg hover:bg-blue-600 hover:text-white">
                            <IoHome />
                            <h3>Home</h3>
                        </div>
                    </Link>
                    <Link to='/dashbord/myTask' className="flex gap-2 items-center text-lg font-semibold cursor-pointer p-2 mx-1 rounded-lg hover:bg-blue-600 hover:text-white">
                        <LuLayoutGrid />
                        <h3>My Task</h3>
                    </Link>
                    <Link to='/dashbord/chat' className="flex gap-2 items-center text-lg font-semibold cursor-pointer p-2 mx-1 rounded-lg hover:bg-blue-600 hover:text-white">
                        <IoChatbubblesSharp />
                        <h3>Team Chat</h3>
                    </Link>
                    <Link to='/dashbord/team' className="flex gap-2 items-center text-lg font-semibold cursor-pointer p-2 mx-1 rounded-lg hover:bg-blue-600 hover:text-white">
                        <AiOutlineTeam />
                        <h3>My Team</h3>
                    </Link>
                    {user?.isAdmin &&
                        <Link to='/dashbord/joining' className="flex gap-2 items-center text-lg font-semibold cursor-pointer p-2 mx-1 rounded-lg hover:bg-blue-600 hover:text-white">
                            <AiOutlineUsergroupAdd />
                            <h3>Joining Request</h3>
                        </Link>
                    }
                    <Link to='/dashbord/onGoingProject' className="flex gap-2 items-center text-lg font-semibold cursor-pointer p-2 mx-1 rounded-lg hover:bg-blue-600 hover:text-white">
                        <GoProjectSymlink />
                        <h3>On Going Project</h3>
                    </Link>
                    <Link to='/dashbord/complitedProject' className="flex gap-2 items-center text-lg font-semibold cursor-pointer p-2 mx-1 rounded-lg hover:bg-blue-600 hover:text-white">
                        <AiOutlineFileDone />
                        <h3>Complited Project</h3>
                    </Link>
                    <Link to='/dashbord/profile' className="flex gap-2 items-center text-lg font-semibold cursor-pointer p-2 mx-1 rounded-lg hover:bg-blue-600 hover:text-white">
                        <CgProfile />
                        <h3>Profile</h3>
                    </Link>


                    <div className="absolute bottom-2 w-[250px]">
                        <div onClick={() => logOutUser()} className="flex gap-2 items-center text-lg font-semibold cursor-pointer p-2 mx-1 rounded-lg bg-blue-100 hover:bg-blue-600 hover:text-white">
                            <FaPowerOff />
                            <h3>Sign Out</h3>
                        </div>
                    </div>

                </div>
            </div>
            {/* Mobile Menu */}
            <div className="lg:hidden md:block block">
                <div className="absolute bottom-0 left-0">
                    <div className={`fixed z-40 w-full overflow-y-auto bg-white border-t border-gray-200 rounded-t-lg dark:border-gray-700 dark:bg-gray-800 left-0 right-0 transition-all translate-y-full pb-20 ${isMenuOpen ? 'bottom-[520px]' : 'bottom-[60px]'} `}>
                        <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                            <span className="absolute w-8 h-1 -translate-x-1/2 bg-gray-300 rounded-lg top-3 left-1/2 dark:bg-gray-600"></span>
                            <h5 id="drawer-swipe-label" className="inline-flex items-center text-base text-gray-500 dark:text-gray-400 font-medium"><svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10ZM17 13h-2v-2a1 1 0 0 0-2 0v2h-2a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2Z" />
                            </svg>Menu</h5>
                        </div>
                        {/* Menu  */}
                        <div className="grid grid-cols-3 gap-4 p-4 lg:grid-cols-4">
                            <div className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
                                <Link to='/dashbord'>
                                    <div className="flex justify-center items-center p-2 mx-auto mb-2 text-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
                                        <IoHome className="text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <div className="font-medium text-sm text-center text-gray-500 dark:text-gray-400">Home</div>
                                </Link>
                            </div>
                            <div className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
                                <Link to='/dashbord/myTask'>
                                    <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
                                        <LuLayoutGrid className="text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <div className="font-medium text-sm text-center text-gray-500 dark:text-gray-400">My Task</div>
                                </Link>
                            </div>
                            <div className="hidden p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 lg:block">
                                <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
                                    <IoHome className="text-gray-500 dark:text-gray-400" />
                                </div>
                                <div className="hidden font-medium text-center text-gray-500 dark:text-gray-400">Ticket</div>
                            </div>
                            <div className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
                                <Link to='/dashbord/chat'>
                                    <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
                                        <IoChatbubblesSharp className="text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <div className="font-medium text-sm text-center text-gray-500 dark:text-gray-400">Team Chat</div>
                                </Link>
                            </div>
                            <div className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
                                <Link to='/dashbord/team'>
                                    <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
                                        <AiOutlineTeam className="text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <div className="font-medium text-sm text-center text-gray-500 dark:text-gray-400">My Team</div>
                                </Link>
                            </div>
                            {user?.isAdmin &&
                                <div className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
                                    <Link to='/dashbord/joining'>
                                        <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
                                            <AiOutlineUsergroupAdd className="text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <div className="font-medium text-sm text-center text-gray-500 dark:text-gray-400">Join Request</div>
                                    </Link>
                                </div>
                            }
                            <div className="hidden p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 lg:block">
                                <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
                                    <IoHome className="text-gray-500 dark:text-gray-400" />
                                </div>
                                <div className="font-medium text-sm text-center text-gray-500 dark:text-gray-400">Task</div>
                            </div>
                            <div className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
                                <Link to='/dashbord/onGoingProject'>
                                    <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
                                        <GoProjectSymlink className="text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <div className="font-medium text-sm text-center text-gray-500 dark:text-gray-400">On Going Project</div>
                                </Link>
                            </div>
                            <div className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
                                <Link to='/dashbord/complitedProject'>
                                    <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
                                        <AiOutlineFileDone className="text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <div className="font-medium text-[13px] text-center text-gray-500 dark:text-gray-400">Completed Project</div>
                                </Link>
                            </div>
                            <div className="hidden p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 lg:block">
                                <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
                                    <IoHome className="text-gray-500 dark:text-gray-400" />
                                </div>
                                <div className="font-medium text-sm text-center text-gray-500 dark:text-gray-400">Task</div>
                            </div>
                            <div className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
                                <Link to='/dashbord/profile'>
                                    <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
                                        <CgProfile className="text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <div className="font-medium text-sm text-center text-gray-500 dark:text-gray-400">Profile</div>
                                </Link>
                            </div>
                            <div onClick={() => logOutUser()} className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
                                <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
                                    <FaPowerOff className="text-gray-500 dark:text-gray-400" />
                                </div>
                                <div className="font-medium text-sm text-center text-gray-500 dark:text-gray-400">Sign Out</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SideNav