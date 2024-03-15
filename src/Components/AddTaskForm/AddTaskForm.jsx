import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../AppContext/AppContextProvider";

const AddTaskForm = () => {
    const { currentUser, setUpdatePage } = useContext(AppContext);
    const [errorMsg, setErrorMsg] = useState('');

    const handleFormSubmit = (e) => {
        const Form = e.target;
        const projectName = Form.projectName.value;
        const projectDescription = Form.projectDescription.value;
        const projectInfo = { projectName, projectDescription, status: 'ongoing',  access: [{ email: currentUser?.email, displayName: currentUser?.displayName, photoURL: currentUser?.photoURL }], email: currentUser?.email }

        e.preventDefault();

        // Form Validation
        if (projectInfo.projectName === '') {
            return setErrorMsg('Project Name Can not be empty')
        } else if (projectInfo.projectDescription === '') {
            return setErrorMsg('Project Description Cannot be empty');
        } else {
            setErrorMsg('');

            setUpdatePage(true);

            fetch('http://localhost:5000/projects', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(projectInfo)
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.insertedId) {
                        toast.success('Project Created Sucessfully')
                    }
                })

            Form.reset()
        }
    }



    return (
        <div>
            <h1 className='text-xl font-semibold'>Create New Project</h1>

            <form onSubmit={handleFormSubmit} className='mt-4'>
                <div className='flex flex-col mb-2'>
                    <label className='font-semibold mb-1'>Project Name</label>
                    <input className='border p-2 my-1 rounded outline-none' name="projectName" type="text" placeholder='Project Name' />
                </div>
                <div className='flex flex-col mb-2'>
                    <label className='font-semibold mb-1'>Project Details</label>
                    <textarea className='border p-2 my-1 rounded outline-none' name="projectDescription" type="text" placeholder='Project Details' />
                </div>
                <div>
                    {errorMsg && <p className="text-red-500 font-semibold">*{errorMsg}</p>}
                </div>
                <button className="bg-blue-600 text-white w-full font-semibold py-2 mt-2 outline-none border-none rounded">Create Project</button>
            </form>
        </div>
    )
}

export default AddTaskForm