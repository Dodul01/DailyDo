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