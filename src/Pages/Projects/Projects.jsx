import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../AppContext/AppContextProvider"
import { Link } from 'react-router-dom';
import Modal from "../../Components/Modal/Modal";
import { AiFillPlusCircle } from "react-icons/ai";
import AddTaskForm from "../../Components/AddTaskForm/AddTaskForm";

const Projects = () => {
  const { currentUser, updatePage } = useContext(AppContext);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/projects?email=${currentUser?.email}`)
      .then(req => req.json())
      .then(data => setProjects(data))
  }, [updatePage])

  return (
    <div>
      {/* Name and image Section starts here */}
      <div className="flex items-center justify-between border-b-2 pb-4">
        <div className="flex items-center gap-2">
          <img className="h-[80px] w-[80px] object-cover rounded-full border border-blue-600" src={currentUser?.photoURL} alt="" />
          <div>
            <h2 className="text-xl font-semibold">{currentUser?.displayName}</h2>
            <p className="text-lg font-semibold">{currentUser?.email}</p>
          </div>
        </div>

        <div>
          <button onClick={() => setIsClicked(true)} className="bg-blue-600 text-white px-3 py-2 text-lg font-semibold flex items-center justify-center gap-1 rounded-lg"><AiFillPlusCircle className='text-4xl bg-blue-600' /> Create Project</button>
          {isClicked && <Modal setIsClicked={setIsClicked}>
            <AddTaskForm />
          </Modal>}
        </div>
      </div>
      {/* Name and image section end here */}

      <h1 className='text-3xl font-bold mx-3 my-5'>My Projects</h1>

      {/* All Projects section starts here */}
      <div className="w-full">
        {projects.map((project) => {
          return <div key={project?._id} className="flex justify-between bg-blue-50 border p-2 rounded-lg m-2 w-[99%]">
            <Link className="cursor-pointer" to={`/dashbord/projects/${project?._id}`}>
              <h1 className="text-xl font-bold">{project?.projectName}</h1>
              <p className="text-lg text-gray-600">{project?.projectDescription}</p>
            </Link>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-3 py-2 h-[40px] font-semibold flex items-center justify-center gap-1 cursor-pointer rounded-lg">Add Member</button>

            {isModalOpen && <Modal setIsClicked={setIsModalOpen} >
              <h1 className="text-2xl font-semibold">This feature will be added soon.</h1>
            </Modal>}
          </div>
        })}
      </div>
      {/* All Projects section ends here */}
    </div>
  )
}

export default Projects