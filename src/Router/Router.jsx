import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Dashbord from "../Pages/Dashbord/Dashbord";
import SignIn from "../Pages/SignIn/SignIn";
import PrivateRouter from "./PrivateRouter";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/signUp',
                element: <SignUp />,
            },
            {
                path: '/signIn',
                element: <SignIn />
            },
            {
                path: '/dashbord',
                element: <PrivateRouter><Dashbord /></PrivateRouter>
            }
        ]
    }
])
export default router;