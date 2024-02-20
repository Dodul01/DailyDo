import { useContext } from "react";
import { AppContext } from "../../AppContext/AppContextProvider";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { LuLayoutGrid } from "react-icons/lu";
import { FaPowerOff } from "react-icons/fa";
import { AiOutlineTeam, AiOutlineFileDone } from "react-icons/ai";
import { IoChatbubblesSharp } from "react-icons/io5";
import { GoProjectSymlink } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

const SideNav = () => {
    const { logOutUser } = useContext(AppContext);

    return (
        <div className='w-[250px] bg-slate-50 border-r-2'>
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
    )
}

export default SideNav