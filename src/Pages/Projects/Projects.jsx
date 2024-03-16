import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../AppContext/AppContextProvider"
import { Link } from 'react-router-dom';
import Modal from "../../Components/Modal/Modal";
import { AiFillPlusCircle } from "react-icons/ai";
import AddTaskForm from "../../Components/AddTaskForm/AddTaskForm";
import toast from "react-hot-toast";

const Projects = () => {
  const { currentUser, updatePage, setUpdatePage } = useContext(AppContext);
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

  // const handleAddPepole = (project) => {
  //   setIsModalOpen(true)
  //   const email = project.email;

  //   fetch('http://localhost:5000/allUsers')
  //     .then(req => req.json())
  //     .then(res => {
  //       const taskOwner = res.find(member => member.email == email);
  //       const employees = res.filter(employee => employee.companyName == taskOwner.companyName);
  //       setMembers(employees);
  //     })
  // }

  const [selectedProject, setSelectedProject] = useState(null);

  const handleAddPepole = (project) => {
    setSelectedProject(project); // Set the selected project
    setIsModalOpen(true);
    // Fetch members data for the current project
    fetch(`http://localhost:5000/allUsers`)
      .then(req => req.json())
      .then(res => {
        const taskOwner = res.find(member => member.email === project.email);
        const employees = res.filter(employee => employee.companyName === taskOwner.companyName);
        setMembers(employees);
      })
      .catch(error => {
        console.error("Error fetching members data:", error);
      });
  }



  const handleAddToTask = (project, email, displayName, photoURL, index) => {
    const projectInfo = { project, email, displayName, photoURL, index };

    fetch(`http://localhost:5000/addMember/${project._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/JSON',
      },
      body: JSON.stringify(projectInfo)
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success('Person added sucessfully.');
        }
      })
  }


  const handleDeleteProject = (project) => {
    fetch(`http://localhost:5000/projects/${project._id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount) {
          setUpdatePage(!updatePage);
          toast.success('Project Deleted Sucessfully.')
        }
      })
  }

  const handleMarkAsCompleted = (project) => {
    fetch(`http://localhost:5000/projects/${project._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  useEffect(() => {
    // Fetch projects with specific email filter
    fetch(`http://localhost:5000/projects?email=${currentUser?.email}`)
      .then(req => req.json())
      .then(filteredData => {
        setProjects(existingProjects => {
          // Filter out existing projects that are also present in the filteredData
          const existingIds = existingProjects.map(project => project._id);
          const newProjects = filteredData.filter(project => !existingIds.includes(project._id));
          return [...existingProjects, ...newProjects];
        });
      });

    // Fetch all projects
    fetch('http://localhost:5000/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(existingProjects => {
          // Filter out existing projects that are also present in the data
          const existingIds = existingProjects.map(project => project._id);
          const newProjects = data.filter(project => !existingIds.includes(project._id));
          return [...existingProjects, ...newProjects];
        });
      });
  }, [currentUser?.email, updatePage]);


  return (
    <div className="lg:mb-0 mb-16">
      {/* Name and image Section starts here */}
      <div className="flex items-center justify-between flex-wrap border-b-2 pb-4">
        <div className="flex items-center gap-2">
          <img className="h-[80px] w-[80px] object-cover rounded-full border border-blue-600" src={currentUser?.photoURL} alt="" />
          <div>
            <h2 className="text-xl font-semibold">{currentUser?.displayName}</h2>
            <p className="text-lg font-semibold">{currentUser?.email}</p>
          </div>
        </div>

        <div>
          <button onClick={() => setIsClicked(true)} className="bg-blue-600 lg:w-auto lg:mt-0 md:w-auto md:mt-0 w-full mt-4 text-white px-3 py-2 text-lg font-semibold flex items-center justify-center gap-1 rounded-lg"><AiFillPlusCircle className='text-4xl bg-blue-600' /> Create Project</button>
          {isClicked && <Modal setIsClicked={setIsClicked}>
            <AddTaskForm />
          </Modal>}
        </div>
      </div>
      {/* Name and image section end here */}

      <h1 className='text-3xl font-bold mx-3 my-5'>My Projects</h1>

      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {projects.map((project, index) => {
          // Check if the current user's email exists in the access array of the project
          const userHasAccess = project.access.some(item => item.email === currentUser?.email);
          const isComplete = project.status;
          // If the user has access, render the card
          if (userHasAccess) {
            if (isComplete === 'ongoing') {
              return (
                <div key={index} className="w-full lg:max-w-sm bg-white border p-2 border-gray-200 rounded-lg shadow">
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
                            <span onClick={() => handleMarkAsCompleted(project)} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">Mark as completed</span>
                          </li>
                          <li>
                            <span onClick={() => handleDeleteProject(project)} className="block px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-gray-100">Delete Project</span>
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
                          <button onClick={() => handleAddToTask(selectedProject, member?.email, member?.displayName, member?.photoURL, index)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 ">Add</button>
                          </div>
                        </div>
                      </li>
                      )}
                    </ul>
                  </Modal>}

                  <div className="flex flex-col pb-2">
                    <h5 className="mb-1 text-xl font-medium text-gray-900">{project?.projectName}</h5>

                    <div className="flex -space-x-4 my-2 rtl:space-x-reverse">
                      {project.access.map(member => (
                        <div key={member.email}>
                          <img className="w-10 h-10 border-2 object-cover border-blue-600 rounded-full" src={member.photoURL} alt={member.displayName} />
                        </div>
                      ))}
                    </div>

                    <span className="text-sm text-gray-500">{project?.projectDescription}</span>
                    <div className="flex mt-4 md:mt-6">
                      <Link to={`/dashbord/projects/${project?._id}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300">Project Details</Link>
                    </div>
                  </div>
                </div>
              );
            }
          } else {
            // If the user doesn't have access, return null or an empty fragment
            return null;
          }
        })}
      </div>


    </div>
  )
}

export default Projects