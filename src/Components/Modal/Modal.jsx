import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { AppContext } from "../../AppContext/AppContextProvider";
import toast from "react-hot-toast";

const Modal = ({ setIsClicked }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { currentUser } = useContext(AppContext);

    const onSubmit = (data) => {
        const email = currentUser.email;
        const task = { ...data, email , status: ''}

        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    toast.success('Task Added Successfully.')
                }
            })
        reset()
    }

    return (
        <div className='absolute top-0 left-0 bg-black bg-opacity-5 h-screen w-screen transition-all'>
            <div className='flex items-center justify-center h-full'>
                <div className='bg-white w-[600px] shadow rounded-xl'>
                    <button className="float-right m-4 text-2xl" onClick={() => setIsClicked(false)}><RxCross2 /></button>
                    <h1 className="text-lg font-semibold text-center my-2">Add Task</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 w-full gap-2">
                        <label className="text-lg">Task Title</label>
                        <input className="border p-2 rounded-lg outline-none" {...register("title", { required: true })} type="text" placeholder="Task Title" />
                        {errors.title && <span className="text-red-500 text-sm">This field is required</span>}
                        <label className="text-lg">Task Description</label>
                        <textarea className="border p-2 rounded-lg outline-none" cols="10" rows="2"  {...register("description", { required: true })} placeholder="Task Description"></textarea>
                        {errors.description && <span className="text-red-500 text-sm">This field is required</span>}
                        <label className="text-lg">To</label>
                        <input className="border p-2 rounded-lg outline-none" {...register("form", { required: true })} type="date" placeholder="from" />
                        {errors.form && <span className="text-red-500 text-sm">This field is required</span>}
                        <label className="text-lg">From</label>
                        <input className="border p-2 rounded-lg outline-none" type="date" {...register("to", { required: true })} placeholder="to" />
                        {errors.to && <span className="text-red-500 text-sm">This field is required</span>}
                        <label className="text-lg">Set Priority</label>
                        <select className="border p-2 rounded-lg outline-none" {...register("priority", { required: true })} name="priority">
                            <option value="null">Select Priority</option>
                            <option value="high">High</option>
                            <option value="moderate">Moderate</option>
                            <option value="low">Low</option>
                        </select>
                        {errors.priority && <span className="text-red-500 text-sm">This field is required</span>}
                        <button className="bg-blue-600 py-2 text-white text-lg rounded-lg mt-4">Add Task</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal