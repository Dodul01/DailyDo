import { BsSend } from "react-icons/bs";
import flymessage from '../../assets/flyMessage.gif';

const Messanger = () => {
    return (
        <div className='relative h-[97vh]'>
            <div className="flex items-center justify-center">
                <div>
                    <img className="max-h-[400px] mb-2" src={flymessage} alt="" />
                    <h1 className='text-3xl font-bold text-center mb-2'>Welcome to message page.</h1>
                    <p className="text-lg text-gray-600 text-center">We are working on this feature. Thanks for your patience.</p>
                </div>
            </div>


            <div>
                <form class="mx-auto">
                    <div class="absolute bottom-0 left-0 w-full border rounded-lg">
                        <input type="search" id="location-search" class="block p-4 w-full z-20 text-md outline-none rounded-lg text-gray-900 bg-blue-50 rounded-e-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Type you text here" required />
                        <button type="submit" class="absolute top-0 end-0 h-full p-4 text-lg font-medium text-white bg-blue-700 rounded-e-lg  border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            <BsSend />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Messanger