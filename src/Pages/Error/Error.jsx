import error from '../../assets/error.gif';
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className='flex item-center justify-center h-full w-full'>
            <div>
                <img className='lg:h-[500px] h-[300px] w-auto' src={error} alt="" />
                <h1 className='text-xl font-semibold text-center'>Opps Someting went wrong please go back or refreash the page.</h1>
            </div>
        </div>
    )
}

export default Error