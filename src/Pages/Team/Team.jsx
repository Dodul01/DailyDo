import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext/AppContextProvider"


const Team = () => {
    const [members, setMembers] = useState([]);
    const [dropdownStates, setDropdownStates] = useState(Array(members.length).fill(false));
    const { currentUser } = useContext(AppContext);
    const email = currentUser.email;


    const toggleDropdown = (index) => {
        const newDropdownStates = [...dropdownStates];
        newDropdownStates[index] = !newDropdownStates[index];
        setDropdownStates(newDropdownStates);
    };


    useEffect(() => {
        fetch('http://localhost:5000/allUsers')
            .then(req => req.json())
            .then(res => {
                const taskOwner = res.find(member => member.email == email);
                const employees = res.filter(employee => employee.companyName == taskOwner.companyName);
                setMembers(employees);
            })
    }, [])


    return (
        <div>
            <h1 className="text-2xl font-semibold mb-3">You Team</h1>
            <div className="grid grid-cols-5">
                {members.map((member, index) => {
                    return <div className="relative h-[250px] w-[200px] overflow-hidden rounded-tl-3xl rounded-br-3xl border border-b-0 shadow-sm" key={member._id}>
                        <img className="h-[250px] w-[200px] object-cover bg-center" src={member?.photoURL} alt="" />

                        <button onClick={() => toggleDropdown(index)} className="absolute top-2 right-2 inline-block text-black hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                        </button>


                        {dropdownStates[index] && (
                            <div className="z-10 absolute top-10 right-2 text-base list-none bg-white border divide-y divide-gray-100 rounded-lg shadow w-44">
                                <ul className="py-2" aria-labelledby="dropdownButton">
                                    <li>
                                        <span className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">Send Text</span>
                                    </li>
                                    <li>
                                        <span className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">Remove From Team</span>
                                    </li>
                                </ul>
                            </div>
                        )}


                        <div className="absolute top-48 transition-all hover:top-28 left-0  h-[160px] p-2 w-full text-black bg-white rounded-l-3xl">
                            <h1 className="text-lg font-semibold">{member?.displayName}</h1>
                            <p>{member?.email}</p>
                            <p>{member?.phoneNumber}</p>
                            <p>{member?.userRole}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Team