import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../AppContext/AppContextProvider";

const AddProjectTask = ({ project }) => {
    const [errorMsg, setErrorMsg] = useState('');
    const { setUpdatePage } = useContext(AppContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const Form = e.target;
        const taskName = Form.taskName.value;
        const priority = Form.priority.value;
        const taskDescription = Form.taskDescription.value;
        
        const task = {
            projectOwner: project.email,
            projectName: project._id,
            taskStatus: 'todo',
            taskName, priority, taskDescription
        }


        fetch('http://localhost:5000/subtask', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then((res) => res.json())
            .then((data) => {
                setUpdatePage(true)
                if (data.insertedId) {
                    toast.success('Task Created Sucessfully')
                }
            })


        Form.reset();
    }



    return (
        <div>
            <h1 className='text-xl font-semibold'>Add Task</h1>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div className='flex flex-col mb-2'>
                    <label className='font-semibold mb-1'>Task Name</label>
                    <input className='border p-2 my-1 rounded outline-none' name="taskName" type="text" placeholder='Task Name' />
                </div>
                <div className='flex flex-col mb-2'>
                    <select className='border p-2 my-1 rounded outline-none' name="priority">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className='flex flex-col mb-2'>
                    <label className='font-semibold mb-1'>Description</label>
                    <textarea className='border p-2 my-1 rounded outline-none' name="taskDescription" placeholder="Task Description" cols="20" rows="5"></textarea>
                </div>

                <div>
                    {errorMsg && <p className="text-red-500 font-semibold">*{errorMsg}</p>}
                </div>
                <button className="bg-blue-600 text-white w-full font-semibold py-2 mt-2 outline-none border-none rounded">Create Project</button>
            </form>
        </div>
    )
}

export default AddProjectTask