import { useContext } from "react"
import { AppContext } from "../AppContext/AppContextProvider"
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
    const { loading, currentUser } = useContext(AppContext);

    if (loading) {
        return <div>
            <h1 className="text-xl font-bold text-center">Loading...</h1>
        </div>
    }

    if (currentUser) {
        return children
    }

    return (
        <Navigate to='/signIn' />
    )
}

export default PrivateRouter