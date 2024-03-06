import { AiFillPlusCircle } from 'react-icons/ai';
import mountain from '../../assets/mountain.jpg';
import todoGif from '../../assets/todo.gif';

const MyTasks = () => {
    return (
        <div>
            <div className='relative'>
                <img className='w-full h-[150px] object-cover rounded-lg' src={mountain} alt="mountain" />
                <div className='absolute top-0 left-0 bg-black bg-opacity-40 w-full h-full rounded-lg'>
                    <div className='flex items-center justify-between h-full p-4'>
                        <h1 className='text-4xl text-white'>Todo</h1>
                        <button className="bg-blue-600 text-white px-2 py-1 text-lg font-semibold flex items-center justify-center gap-1 rounded-lg"><AiFillPlusCircle className='text-4xl bg-blue-600' />Add Todo</button>
                    </div>
                </div>
            </div>
            
            <div className='flex items-center justify-center flex-col'>
                <img className='w-[400px] h-auto' src={todoGif} alt="todogif" />
                <h1 className='text-2xl font-semibold text-center'>This feature will be added soon</h1>
            </div>
        </div>
    )
}

export default MyTasks