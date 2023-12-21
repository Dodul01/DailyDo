import { IoHome } from "react-icons/io5";
import { LuLayoutGrid } from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";
import { FaPowerOff } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../../AppContext/AppContextProvider";
import { AiFillPlusCircle } from "react-icons/ai";

const Dashbord = () => {
  const { currentUser } = useContext(AppContext);
  return (
    <div className='flex max-w-screen-2xl mx-auto rounded border min-h-screen'>
      <div className='w-[250px] bg-slate-50 border-r-2'>
        <h1 className='text-2xl font-bold text-center my-2'> <span className='text-blue-600'>Daily</span>Do<span className='text-blue-600'>.</span></h1>
        <h2 className="text-xl font-semibold text-center mb-5 text-gray-600">Task Manager</h2>
        <div>
          <div className="flex gap-2 items-center text-lg font-semibold cursor-pointer p-2 mx-1 rounded-lg hover:bg-blue-600 hover:text-white">
            <IoHome />
            <h3>Home</h3>
          </div>
          <div className="flex gap-2 items-center text-lg font-semibold cursor-pointer p-2 mx-1 rounded-lg hover:bg-blue-600 hover:text-white">
            <LuLayoutGrid />
            <h3>Dashbord</h3>
          </div>
          <div className="flex gap-2 items-center text-lg font-semibold cursor-pointer p-2 mx-1 rounded-lg hover:bg-blue-600 hover:text-white">
            <RxAvatar />
            <h3>Profile</h3>
          </div>


          <div className="absolute bottom-2 w-[250px]">
            <div className="flex gap-2 items-center text-lg font-semibold cursor-pointer p-2 mx-1 rounded-lg bg-blue-100 hover:bg-blue-600 hover:text-white">
              <FaPowerOff />
              <h3>Sign Out</h3>
            </div>
          </div>

        </div>
      </div>


      <div className='flex-1 p-2'>
        {/* Name and Image */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img className="h-[80px] w-[80px] object-cover rounded-full border border-blue-600" src={currentUser.photoURL} alt="" />
            <div>
              <h2 className="text-xl font-semibold">{currentUser.displayName}</h2>
              <p className="text-lg font-semibold">{currentUser.email}</p>
            </div>
          </div>

          <div>
            <button className="bg-blue-600 text-white px-3 py-2 text-lg font-semibold flex items-center justify-center gap-1 rounded-lg"><AiFillPlusCircle className="text-2xl font-bold mt-1" /> Create Task</button>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashbord