import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext/AppContextProvider";
import toast from "react-hot-toast";
import SideNav from "../../Components/SideNav/SideNav";
import { Outlet } from 'react-router-dom'
import WaitingPage from "../WaitingPage/WaitingPage";


const Dashbord = () => {
  const { currentUser, logOutUser } = useContext(AppContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isComplite, setIsComplite] = useState(false);
  const [isVerifyed, setIsVerifyed] = useState(false);

  const handleDelete = (id) => {
    fetch(`https://task-management-server-liard-mu.vercel.app/tasks/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          toast.success('Task delete successfully.')
          setIsDeleted(!isDeleted)
        }
      })
  }

  const handleCompliteTask = (task) => {
    task['status'] = 'complete';

    fetch(`https://task-management-server-liard-mu.vercel.app/tasks/${task._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/JSON'
      },
      body: JSON.stringify(task)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setIsComplite(!isComplite)
          toast.success('Task Status Modefied.')
        }
      })
  }

  const handleOnGoingTask = (task) => {
    task['status'] = 'onGoing';

    fetch(`https://task-management-server-liard-mu.vercel.app/tasks/${task._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/JSON'
      },
      body: JSON.stringify(task)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setIsComplite(!isComplite)
          toast.success('Task Status Modefied.')
        }
      })
  }


  // useEffect(() => {
  //   fetch(`https://task-management-server-liard-mu.vercel.app/tasks?email=${currentUser?.email}`)
  //     .then((res) => res.json())
  //     .then((data) => setTasks(data))
  // }, [currentUser, isClicked, isDeleted, isComplite])

  useEffect(() => {
    fetch(`http://localhost:5000/user?email=${currentUser?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsVerifyed(data[0]?.isVerifyed)
      })

    /**
     * dont use mozammelHoqueDodul@gmail.com
     * use mozammelhoquedodul@gmail.com
     * */

  }, [currentUser])

  return (
    <div className='flex lg:flex-row md:flex-col max-w-screen-2xl mx-auto rounded border min-h-screen'>
      {isVerifyed ?
        <SideNav />
        :
        ''
      }

      <div className='flex-1 p-2'>
        {isVerifyed === true ? <Outlet /> : <WaitingPage />}
      </div>
    </div>
  )
}

export default Dashbord