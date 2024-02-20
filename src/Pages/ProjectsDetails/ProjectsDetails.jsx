import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AiFillPlusCircle } from "react-icons/ai";
import Modal from '../../Components/Modal/Modal';
import AddProjectTask from '../../Components/AddProjectTask/AddProjectTask';

const ProjectsDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`)
            .then(req => req.json())
            .then(data => setProject(data))

        fetch('`http://localhost:5000/tasks')
    }, [])

    return (
        <div>
            <div className='flex justify-between border-b-2 pb-4'>
                <div>
                    <h1 className='text-3xl font-bold mx-3 my-5'>{project?.projectName}</h1>
                    <p className='mx-3'>{project?.projectDescription}</p>
                </div>
                <div className='my-4'>
                    <span onClick={() => setIsClicked(true)} className="bg-blue-600 cursor-pointer text-white px-3 py-2 text-lg font-semibold flex items-center justify-center gap-1 rounded-lg">Create Task<AiFillPlusCircle className='text-4xl bg-blue-600' /></span>
                </div>
            </div>

            {isClicked && <Modal setIsClicked={setIsClicked}>
                <AddProjectTask project={project} />
            </Modal>}


            {/*  */}
            <div>
                <div className="flex items-center justify-between w-full">
                    <div className="w-full p-2 h-[64vh] overflow-hidden overflow-y-auto scrollbar-hide border-r-2">
                        <h1 className="text-lg font-semibold">Todo</h1>
                    </div>
                    <div className="w-full p-2 h-[64vh] overflow-hidden overflow-y-auto scrollbar-hide border-r-2">
                        <h1 className="text-lg font-semibold">Ongoing</h1>
                    </div>
                    <div className="w-full p-2 h-[64vh] overflow-hidden overflow-y-auto scrollbar-hide">
                        <h1 className="text-lg font-semibold">Complited</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectsDetails