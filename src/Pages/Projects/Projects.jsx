import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../AppContext/AppContextProvider"
import { Link } from 'react-router-dom';
import Modal from "../../Components/Modal/Modal";
import { AiFillPlusCircle } from "react-icons/ai";
import AddTaskForm from "../../Components/AddTaskForm/AddTaskForm";
import toast from "react-hot-toast";

const Projects = () => {
  const { currentUser, updatePage } = useContext(AppContext);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [members, setMembers] = useState([]);
  const [dropdownStates, setDropdownStates] = useState(Array(projects.length).fill(false));

  const toggleDropdown = (index) => {
    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index] = !newDropdownStates[index];
    setDropdownStates(newDropdownStates);
  };

  const handleAddPepole = (project) => {
    setIsModalOpen(true)
    const email = project.email;


    fetch('http://localhost:5000/allUsers')
      .then(req => req.json())
      .then(res => {
        const taskOwner = res.find(member => member.email == email);
        const employees = res.filter(employee => employee.companyName == taskOwner.companyName);
        setMembers(employees);
      })
  }

  const handleAddToTask = () => {
    toast.success('We Are working on this feature')
  }


  useEffect(() => {
    fetch(`http://localhost:5000/projects?email=${currentUser?.email}`)
      .then(req => req.json())
      .then(data => {
        setProjects(data)
      })
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

      <div className="w-full grid lg:grid-cols-3 gap-4">
        {projects.map((project, index) => {
          return <div key={index} className="w-full max-w-sm bg-white border p-2 border-gray-200 rounded-lg shadow">
            <div className="flex justify-end px-4 pt-2 relative">
              <button onClick={() => toggleDropdown(index)} className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5" type="button">
                <span className="sr-only">Open dropdown</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </button>
              {dropdownStates[index] && (
                <div className="z-10 absolute top-14 right-4 text-base list-none bg-white border divide-y divide-gray-100 rounded-lg shadow w-44">
                  <ul className="py-2" aria-labelledby="dropdownButton">
                    <li onClick={() => handleAddPepole(project)}>
                      <span className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">Add Person</span>
                    </li>
                    <li>
                      <span className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">Edit</span>
                    </li>
                    <li>
                      <span className="block px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-gray-100">Delete</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {isModalOpen && <Modal setIsClicked={setIsModalOpen} >
              <h1 className="text-2xl font-semibold mb-3">All Members</h1>

              <ul className="max-w-full divide-y divide-gray-200">
                {members?.map((member, i) => <li key={i} className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src={member?.photoURL} alt="user_image" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {member?.displayName}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {member?.email}
                      </p>
                      <p>
                        {member?.userRole}

                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      <button onClick={handleAddToTask} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 ">Add</button>
                    </div>
                  </div>
                </li>
                )}
              </ul>
            </Modal>}

            <div className="flex flex-col pb-2">
              <h5 className="mb-1 text-xl font-medium text-gray-900">{project?.projectName}</h5>

              <div className="flex -space-x-4 rtl:space-x-reverse">
                <img className="w-10 h-10 border-2 object-cover border-blue-600 rounded-full" src="data:image/jpeg;base64,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" alt="" />
                <img className="w-10 h-10 border-2 object-cover border-blue-600 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUHBZKXbfShIy41ifcVKmbWmqp4p-NnLi2NA&usqp=CAU" alt="" />
                <img className="w-10 h-10 border-2 object-cover border-blue-600 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaVHGNvFyYsm-23O610FD4_96GbDeWdALgyA&usqp=CAU" alt="" />
                <img className="w-10 h-10 border-2 object-cover border-blue-600 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcXLyVAdbrGSaJi8O99U3S3pOj-IygurNmYPXRtsoJtGV-yXvYVu0YE5UqDICnoy7myl0&usqp=CAU" alt="" />
              </div>

              <span className="text-sm text-gray-500">{project?.projectDescription}</span>
              <div className="flex mt-4 md:mt-6">
                <Link to={`/dashbord/projects/${project?._id}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300">Project Details</Link>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default Projects