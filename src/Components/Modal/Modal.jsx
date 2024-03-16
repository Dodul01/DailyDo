import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { AppContext } from "../../AppContext/AppContextProvider";
import toast from "react-hot-toast";

const Modal = ({ setIsClicked, children }) => {
    // const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { currentUser, updatePage, setUpdatePage } = useContext(AppContext);

    const handleCloseModal = () =>{
        setIsClicked(false)
        setUpdatePage(!updatePage)
    }

    return (
        <div className='absolute top-0 left-0 z-20 bg-black bg-opacity-40 h-screen w-screen transition-all'>
            <div className='flex items-center justify-center h-full'>
                <div className='bg-white w-[600px] shadow rounded-xl'>
                    <button className="float-right m-4 text-2xl" onClick={handleCloseModal}><RxCross2 /></button>
                    {/* Form Content Starts Here */}
                    <div className="m-4">
                        {children}
                    </div>
                    {/* Form Content Ends Here */}
                </div>
            </div>
        </div>
    )
}

export default Modal