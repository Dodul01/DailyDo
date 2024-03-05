import { AiFillPlusCircle } from 'react-icons/ai';
import mountain from '../../assets/mountain.jpg';

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
            
            <div>

            </div>
        </div>
    )
}

export default MyTasks