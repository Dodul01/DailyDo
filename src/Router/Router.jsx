import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Dashbord from "../Pages/Dashbord/Dashbord";
import SignIn from "../Pages/SignIn/SignIn";
import PrivateRouter from "./PrivateRouter";
import Projects from "../Pages/Projects/Projects";
import MyTasks from "../Pages/MyTasks/MyTasks";
import ProjectsDetails from "../Pages/ProjectsDetails/ProjectsDetails";
import SignUpAsCompany from "../Pages/SignUpAsCompany/SignUpAsCompany";

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
                path: '/joinAsCompany',
                element: <SignUpAsCompany />
            },
            {
                path: '/dashbord',
                element: <PrivateRouter><Dashbord /></PrivateRouter>,
                children: [
                    {
                        path: '/dashbord',
                        element: <PrivateRouter><Projects /></PrivateRouter>
                    },
                    {
                        path: '/dashbord/myTask',
                        element: <PrivateRouter><MyTasks /></PrivateRouter>
                    },
                    {
                        path: '/dashbord/projects/:id',
                        element: <PrivateRouter><ProjectsDetails /></PrivateRouter>
                    },
                ]
            }
        ]
    }
])
export default router;