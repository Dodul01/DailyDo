import { RxCross2 } from "react-icons/rx";

const Modal = ({ setIsClicked }) => {
    return (
        <div className='absolute top-0 left-0 bg-black bg-opacity-5 h-screen w-screen transition-all'>
            <div className='flex items-center justify-center h-full'>
                <div className='bg-white w-[600px] shadow rounded-xl'>
                    <button className="float-right m-4 text-2xl" onClick={() => setIsClicked(false)}><RxCross2 /></button>
                    <h1 className="text-lg font-semibold text-center my-2">Add Task</h1>
                    <form className="flex flex-col p-5 w-full gap-2">
                        <label className="text-lg">Task Title</label>
                        <input className="border p-2 rounded-lg outline-none" type="text" placeholder="Task Title" />
                        <label className="text-lg">Task Description</label>
                        <textarea className="border p-2 rounded-lg outline-none" cols="10" rows="2" placeholder="Task Description"></textarea>
                        <label className="text-lg">To</label>
                        <input className="border p-2 rounded-lg outline-none" type="date" placeholder="from" />
                        <label className="text-lg">From</label>
                        <input className="border p-2 rounded-lg outline-none" type="date" placeholder="to" />
                        <label className="text-lg">Set Priority</label>
                        <select className="border p-2 rounded-lg outline-none" name="priority">
                            <option value="null">Select Priority</option>
                            <option value="high">High</option>
                            <option value="moderate">Moderate</option>
                            <option value="low">Low</option>
                        </select>
                        <button className="bg-blue-600 py-2 text-white text-lg rounded-lg mt-4">Add Task</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal