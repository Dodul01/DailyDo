import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AiFillPlusCircle } from "react-icons/ai";
import Modal from '../../Components/Modal/Modal';
import AddProjectTask from '../../Components/AddProjectTask/AddProjectTask';
import { FaPen, FaRegCalendarAlt, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { AppContext } from '../../AppContext/AppContextProvider';

const ProjectsDetails = () => {
    const { id } = useParams();
    const { updatePage, setUpdatePage } = useContext(AppContext);
    const [isClicked, setIsClicked] = useState(false);
    const [project, setProject] = useState([]);
    const [tasks, setTasks] = useState([]);


    const handleOnGoingTask = (task) => {
        task['taskStatus'] = 'onGoing';

        fetch(`http://localhost:5000/subtask/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/JSON'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast.success('Task Updated Sucessfully.')
                    setUpdatePage(!updatePage)
                }
            })
    }

    const handleCompliteTask = (task) => {
        task['taskStatus'] = 'complited';

        fetch(`http://localhost:5000/subtask/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/JSON'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast.success('Task Updated Sucessfully.')
                    setUpdatePage(!updatePage)
                }
            })
    }

    const handleDelete = (taskId) => {
        fetch(`http://localhost:5000/subtask/${taskId}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    setUpdatePage(!updatePage)
                    toast.success('Task deleted sucessfully.');
                }
            })
    }

    const handleTaskUpdate = () => {
        toast('We are working on this feature.')
    }

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`)
            .then(req => req.json())
            .then(data => {
                setProject(data)
            })
    }, [])

    useEffect(() => {
        if (project) {
            fetch(`http://localhost:5000/subtask?projectName=${project?._id}`)
                .then((res) => res.json())
                .then((data) => {
                    setTasks(data)
                })
        }
    }, [project, updatePage])

    return (
        <div>
            <div className='flex justify-between'>
                <div>
                    <h1 className='text-3xl font-bold my-3'>{project?.projectName}</h1>
                    <p className=''>{project?.projectDescription}</p>
                </div>
                <div className='my-4'>
                    <span onClick={() => setIsClicked(true)} className="bg-blue-600 cursor-pointer text-white px-3 py-2 text-lg font-semibold flex items-center justify-center gap-1 rounded-lg">Create Task<AiFillPlusCircle className='text-4xl bg-blue-600' /></span>
                </div>
            </div>

            <div className='pb-4  mt-5 flex gap-1 flex-wrap'>
                {project?.access?.map(member => (
                    <div className='flex border border-blue-600 rounded-lg p-1' key={member?.email}>
                        <div>
                            <img className="w-10 h-10 object-cover rounded-lg" src={member?.photoURL} alt={member?.displayName} />
                        </div>
                        <div className='ml-1'>
                            <p className='text-sm font-medium'>{member?.displayName}</p>
                            <p className='text-sm font-medium'>{member?.email}</p>
                        </div>
                    </div>
                ))}
            </div>

            {isClicked && <Modal setIsClicked={setIsClicked}>
                <AddProjectTask project={project} />
            </Modal>}


            {/*  */}
            <div className='border-t-2 pb-4'>
                <div className="flex items-center justify-between w-full">
                    <div className="w-full p-2 h-[67vh] overflow-hidden overflow-y-auto scrollbar-hide border-r-2">
                        <h1 className="text-lg font-semibold">Todo</h1>
                        {/* Project Task Show Here */}
                        <div>
                            {tasks?.map((task) => {
                                if (task?.taskStatus === 'todo') {
                                    return <div className="bg-blue-50 border p-2 rounded-lg my-2 w-[94%]" key={task._id}>
                                        <div className="flex items-center justify-between gap-1 mb-3">
                                            <h2 className="text-lg font-semibold">{task?.taskName}</h2>
                                            <p className="bg-blue-600 text-white w-[100px] text-center rounded-full">{task.priority}</p>
                                        </div>
                                        <p className="text-gray-600">{task?.taskDescription}</p>
                                        {/* <div className="flex items-center mt-3 gap-2">
                                            <FaRegCalendarAlt className="text-gray-700" />
                                            <p>Form: {task?.form} - </p>
                                            <p>To: {task?.to}</p>
                                        </div> */}
                                        <div className="flex items-center justify-between gap-4 mt-4">
                                            <div className="flex gap-2">
                                                <button onClick={() => handleOnGoingTask(task)} className="bg-blue-500 px-2 py-1 text-white rounded-lg">On Going</button>
                                                <button onClick={() => handleCompliteTask(task)} className="bg-blue-500 px-2 py-1 text-white rounded-lg">Complete</button>
                                            </div>
                                            <div className="flex gap-4">
                                                {/* <FaPen onClick={() => handleTaskUpdate(task)} className="text-lg text-gray-700 cursor-pointer" /> */}
                                                <FaTrash onClick={() => handleDelete(task?._id)} className="text-lg text-gray-700 cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                }
                            }
                            )}
                        </div>
                        {/* Project Task Show Here */}

                    </div>
                    <div className="w-full p-2 h-[67vh] overflow-hidden overflow-y-auto scrollbar-hide border-r-2">
                        <h1 className="text-lg font-semibold">Ongoing</h1>

                        <div>
                            {tasks?.map((task) => {
                                if (task?.taskStatus === 'onGoing') {
                                    return <div className="bg-blue-50 border p-2 rounded-lg my-2 w-[94%]" key={task._id}>
                                        <div className="flex items-center justify-between gap-1 mb-3">
                                            <h2 className="text-lg font-semibold">{task?.taskName}</h2>
                                            <p className="bg-blue-600 text-white w-[100px] text-center rounded-full">{task.priority}</p>
                                        </div>
                                        <p className="text-gray-600">{task?.taskDescription}</p>
                                        {/* <div className="flex items-center mt-3 gap-2">
                                            <FaRegCalendarAlt className="text-gray-700" />
                                            <p>Form: {task?.form} - </p>
                                            <p>To: {task?.to}</p>
                                        </div> */}
                                        <div className="flex items-center justify-between gap-4 mt-4">
                                            <div className="flex gap-2">
                                                <button onClick={() => handleOnGoingTask(task)} className="bg-blue-500 px-2 py-1 text-white rounded-lg">On Going</button>
                                                <button onClick={() => handleCompliteTask(task)} className="bg-blue-500 px-2 py-1 text-white rounded-lg">Complete</button>
                                            </div>
                                            <div className="flex gap-4">
                                                {/* <FaPen onClick={() => handleTaskUpdate(task)} className="text-lg text-gray-700 cursor-pointer" /> */}
                                                <FaTrash onClick={() => handleDelete(task?._id)} className="text-lg text-gray-700 cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                }
                            }
                            )}
                        </div>
                    </div>
                    <div className="w-full p-2 h-[67vh] overflow-hidden overflow-y-auto scrollbar-hide">
                        <h1 className="text-lg font-semibold">Complited</h1>

                        <div>
                            {tasks?.map((task) => {
                                if (task?.taskStatus === 'complited') {
                                    return <div className="bg-blue-50 border p-2 rounded-lg my-2 w-[94%]" key={task._id}>
                                        <div className="flex items-center justify-between gap-1 mb-3">
                                            <h2 className="text-lg font-semibold">{task?.taskName}</h2>
                                            <p className="bg-blue-600 text-white w-[100px] text-center rounded-full">{task.priority}</p>
                                        </div>
                                        <p className="text-gray-600">{task?.taskDescription}</p>
                                        {/* <div className="flex items-center mt-3 gap-2">
                                            <FaRegCalendarAlt className="text-gray-700" />
                                            <p>Form: {task?.form} - </p>
                                            <p>To: {task?.to}</p>
                                        </div> */}
                                        <div className="flex items-center justify-between gap-4 mt-4">
                                            <div className="flex gap-2">
                                                <button onClick={() => handleOnGoingTask(task)} className="bg-blue-500 px-2 py-1 text-white rounded-lg">On Going</button>
                                                <button onClick={() => handleCompliteTask(task)} className="bg-blue-500 px-2 py-1 text-white rounded-lg">Complete</button>
                                            </div>
                                            <div className="flex gap-4">
                                                {/* <FaPen onClick={() => handleTaskUpdate(task)} className="text-lg text-gray-700 cursor-pointer" /> */}
                                                <FaTrash onClick={() => handleDelete(task?._id)} className="text-lg text-gray-700 cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                }
                            }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProjectsDetails