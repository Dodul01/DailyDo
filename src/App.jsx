import { Outlet } from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <div>
      <Outlet />
      <Toaster />
    </div>
  )
}

export default App
