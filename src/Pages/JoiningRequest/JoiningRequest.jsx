import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../AppContext/AppContextProvider";
import { toast } from 'react-hot-toast';

const JoiningRequest = () => {
    const { currentUser } = useContext(AppContext);
    const [employees, setEmployees] = useState([]);

    const handleAddToCompany = (employee) => {
        fetch(`http://localhost:5000/addToTeam/${employee._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/JSON',
            },
            body: JSON.stringify(employee)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.upsertedId) {
                    toast.success('Successfully added to your team.')
                }
            })

    }

    const handleReject = () => {
        toast.success('Member Rejected sucesfully.')
    }


    useEffect(() => {
        fetch('http://localhost:5000/allUsers')
            .then(req => req.json())
            .then(res => {
                const admin = res.find(member => member.email == currentUser.email);
                if (admin.isAdmin) {
                    const members = res.filter(employee => employee.companyName == admin.companyName);
                    setEmployees(members);
                }
            })
    }, [])

    return (
        <div>
            <h1 className='text-4xl font-semibold'>All Joining Request</h1>
            <div className="lg:my-2 grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-2">
                {employees.map((employee) => {

                    if (employee.isVerifyed == true) {
                        return ''
                    }

                    return <div key={employee._id}>
                        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                            <div className="flex flex-col items-center pb-10">
                                <img className="w-24 h-24 mb-3 rounded-full object-cover shadow-lg" src={employee.photoURL} alt="Bonnie image" />
                                <h5 className="mb-1 text-xl font-medium text-gray-900">{employee.displayName}</h5>
                                <span className="text-sm text-gray-500">{employee.userRole}</span>
                                <span className="text-sm text-gray-500">{employee.phoneNumber}</span>
                                <span className="text-sm text-gray-500">{employee.email}</span>
                                <div className="flex mt-4 md:mt-6">
                                    <button onClick={() => handleAddToCompany(employee)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Add to company</button>
                                    <button onClick={handleReject} className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Reject</button>
                                </div>
                            </div>
                        </div>

                    </div>
                })}
            </div>
        </div>
    )
}

export default JoiningRequest