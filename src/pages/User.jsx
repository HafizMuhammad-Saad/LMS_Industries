import { useEffect, useState } from "react"
import { getUsers  } from "../utils/supabaseClient"
import Table from 'react-bootstrap/Table'
import { ToastContainer, toast , Bounce} from 'react-toastify';
import Badge from 'react-bootstrap/Badge';


export default function User() {
    const [loading, setLoading] = useState(false)
    const [usersData, setUsersData] = useState([])

    useEffect(() => {
        userDetails()
    }, [])

    const userDetails = async () => {
        try {
            setLoading(true)
            const response = await getUsers()
            setUsersData(response.data)
            if (response.success) {
                toast.success(response.message)
            }
                else {
                    toast.error(message, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            } 
            
         catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    const updateUserBadge = (role) => {
        switch (role) {
          case "worker":
            return <Badge bg="danger">{role}</Badge>;
          case "manager":
            return <Badge bg="primary">{role}</Badge>;
          default:
            break;
        }
      };

    return (
        <>
         <table className="min-w-full divide-y divide-gray-200 border border-gray-300 shadow-sm">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">#</th>
      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Role</th>
      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200">
    {loading ? (
      <tr>
        <td colSpan={5} className="text-center py-4 text-gray-500">Data is Loading...</td>
      </tr>
    ) : (
      usersData?.map((val, index) => (
        <tr key={val.id || index}>
          <td className="px-6 py-4">{index + 1}</td>
          <td className="px-6 py-4">{val.username}</td>
          <td className="px-6 py-4">{val.email}</td>
          <td className="px-6 py-4">{updateUserBadge(val.role)}</td>
          <td className="px-6 py-4">{val.action}</td>
        </tr>
      ))
    )}
  </tbody>
</table>

        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition={Bounce}
/>
        </>
    )
}