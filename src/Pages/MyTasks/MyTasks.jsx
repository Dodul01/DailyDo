import { AiFillPlusCircle } from 'react-icons/ai';
import mountain from '../../assets/mountain.jpg';
import todoGif from '../../assets/todo.gif';
import { useContext, useEffect, useState } from 'react';
import Modal from '../../Components/Modal/Modal';
import toast from 'react-hot-toast';
import { AppContext } from '../../AppContext/AppContextProvider';
import { FaTrash } from 'react-icons/fa';

const MyTasks = () => {
    const [isClicked, setIsClicked] = useState(false);
    const { currentUser } = useContext(AppContext);
    const [updatePage, setUpdatePage] = useState(false);
    const [todos, setTodos] = useState([]);

    const handleAddTodo = (e) => {
        e.preventDefault();
        const Form = e.target;
        const todoTitle = Form.todoTitle.value;
        const todoDescription = Form.todoDescription.value;
        const todo = { title: todoTitle, description: todoDescription, email: currentUser?.email };

        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Todo added sucessfully')
                }
            })

        setUpdatePage(!updatePage)
        Form.reset();
    }

    const handleDeleteTask = (id) => {
        fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Task delete successfully.')
                    setUpdatePage(!updatePage)
                }
            })
    }

    useEffect(() => {
        fetch(`http://localhost:5000/tasks?email=${currentUser?.email}`)
            .then((res) => res.json())
            .then((data) => setTodos(data))
    }, [updatePage, isClicked])

    return (
        <div>
            <div className='relative'>
                <img className='w-full h-[150px] object-cover rounded-lg' src={mountain} alt="mountain" />
                <div className='absolute top-0 left-0 bg-black bg-opacity-40 w-full h-full rounded-lg'>
                    <div className='flex items-center justify-between h-full p-4'>
                        <h1 className='text-4xl text-white'>Todo</h1>
                        <button onClick={() => setIsClicked(true)} className="bg-blue-600 text-white px-2 py-1 text-lg font-semibold flex items-center justify-center gap-1 rounded-lg"><AiFillPlusCircle className='text-4xl bg-blue-600' />Add Todo</button>
                    </div>
                </div>
            </div>

            {isClicked ? <Modal setIsClicked={setIsClicked}>
                <form onSubmit={handleAddTodo}>
                    <h1 className='font-bold text-center text-2xl mb-4'>Add Todo</h1>
                    <div className='my-2'>
                        <label className='font-medium'>Todo Title</label>
                        <input type="text" placeholder='Todo Title' name='todoTitle' className="bg-gray-100 mt-2 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div className='my-2'>
                        <label className='font-medium'>Todo Description</label>
                        <textarea type="text" placeholder='Todo Description' name='todoDescription' className="bg-gray-100 mt-2 outline-none  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>

                    <button className='mt-4 w-full bg-blue-600 text-white font-semibold p-2 rounded-lg'>Add Todo</button>
                </form>

            </Modal> : ''}

            <div className='my-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2'>
                {todos?.map((todo) => <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{todo?.title}</h5>
                    <p class="font-normal text-gray-700">{todo?.description}</p>
                    <button onClick={() => handleDeleteTask(todo?._id)} className='mt-4'><FaTrash /></button>
                </div>
                )}
            </div>
        </div>
    )
}

export default MyTasks