import { IoHome } from "react-icons/io5";
import { LuLayoutGrid } from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";
import { FaPowerOff } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext/AppContextProvider";
import { AiFillPlusCircle } from "react-icons/ai";
import Modal from "../../Components/Modal/Modal";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import toast from "react-hot-toast";
const Dashbord = () => {
  const { currentUser } = useContext(AppContext);
  const [isClicked, setIsClicked] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      if(data.deletedCount > 0){
        toast.success('Task delete successfully.')
      }
    })
  }

  useEffect(() => {
    fetch(`http://localhost:5000/tasks?email=${currentUser?.email}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
  }, [currentUser, isClicked])

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
        <div className="flex items-center justify-between border-b-2 pb-4">
          <div className="flex items-center gap-2">
            <img className="h-[80px] w-[80px] object-cover rounded-full border border-blue-600" src={currentUser.photoURL} alt="" />
            <div>
              <h2 className="text-xl font-semibold">{currentUser.displayName}</h2>
              <p className="text-lg font-semibold">{currentUser.email}</p>
            </div>
          </div>

          <div>
            <button onClick={() => setIsClicked(true)} className="bg-blue-600 text-white px-3 py-2 text-lg font-semibold flex items-center justify-center gap-1 rounded-lg"><AiFillPlusCircle className="text-2xl font-bold mt-1" /> Create Task</button>
            {isClicked && <Modal setIsClicked={setIsClicked} />}
          </div>
        </div>
        {/* Name and Image */}

        {/* task section */}
        <div className="flex items-center justify-between w-full">
          <div className="w-full p-2 h-[80vh] overflow-hidden">
            <h1 className="text-lg font-semibold">Todo Task</h1>
            {/* Todo Task */}
            {tasks.map(task => {
              return <div className="bg-blue-50 border p-2 rounded-lg m-2 w-[94%]" key={task._id}>
                <div className="flex items-center justify-between gap-1 mb-3">
                  <h2 className="text-lg font-semibold">{task?.title}</h2>
                  <p className="bg-blue-600 text-white w-[100px] text-center rounded-full">{task.priority}</p>
                </div>
                <p className="text-gray-600">{task.description}</p>
                <div className="flex items-center mt-3 gap-2">
                  <FaRegCalendarAlt className="text-gray-700" />
                  <p>Form: {task.form} - </p>
                  <p>To: {task.to}</p>
                </div>
                <div className="flex items-center justify-end gap-4 mt-2">
                  <FaPen className="text-lg text-gray-700 cursor-pointer" />
                  <FaTrash onClick={()=> handleDelete(task._id)} className="text-lg text-gray-700 cursor-pointer" />
                </div>
              </div>
            })}
          </div>
          <div className="w-full p-2 border-l h-[80vh] overflow-hidden">
            <h1 className="text-lg font-semibold">On Going task</h1>
            {/* On Going Task */}

          </div>
          <div className="w-full p-2 border-l h-[80vh] overflow-hidden">
            <h1 className="text-lg font-semibold">Complited task</h1>
            {/* Complited Task */}

          </div>
        </div>
        {/* Task Section */}
      </div>
    </div>
  )
}

export default Dashbord