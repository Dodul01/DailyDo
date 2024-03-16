import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../AppContext/AppContextProvider";
import { Link } from "react-router-dom";

const Completed = () => {
  const [projects, setProjects] = useState([]);
  const { currentUser } = useContext(AppContext);

  useEffect(() => {
    fetch('http://localhost:5000/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
  }, [])

  return (
    <div>
      <h1 className="text-3xl mb-5">Completed Project</h1>
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {projects.map((project, index) => {
          const userHasAccess = project.access.some(item => item.email === currentUser?.email);
          const isComplete = project.status;

          if (userHasAccess) {
            if (isComplete === 'completed') {
              return <div key={index} className="w-full lg:max-w-sm bg-white border p-2 border-gray-200 rounded-lg shadow">
                <div className="flex flex-col pb-2">
                  <h5 className="text-xl font-medium text-gray-900">{project?.projectName}</h5>
                  <span className="my-3  text-sm text-gray-500">{project?.projectDescription}</span>

                  <div className="flex -space-x-4 mt-2 rtl:space-x-reverse">
                    {project.access.map(member => (
                      <div key={member.email}>
                        <img className="w-10 h-10 border-2 object-cover border-blue-600 rounded-full" src={member.photoURL} alt={member.displayName} />
                      </div>
                    ))}
                  </div>

                  <div className="flex mt-4 md:mt-6">
                    <Link to={`/dashbord/projects/${project?._id}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300">Project Details</Link>
                  </div>
                </div>
              </div>
            }
          }
        })}
      </div>
    </div>
  )
}

export default Completed