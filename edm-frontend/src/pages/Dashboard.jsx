import { Link, useNavigate } from "react-router-dom"
import { IoMdLogOut, IoMdPersonAdd, IoMdSearch } from "react-icons/io";
import { FaTrash, FaUserEdit } from "react-icons/fa";

import { MdGroups } from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { deleteEmployee, getAllEmployees as getAllEmp } from "../services/employee";
import { toast } from 'react-toastify'
import { departmentCount } from "../services/department";


// import { FaUsers, FaHome } from "react-icons/fa";

export function Dashboard() {

    const [employees, setEmployees] = useState([]);
    const TableHeader = ["Name", "Email", "Department", "Position", "Status", "Joining Date", "Salary", "Address", "Action"]
    const [activeEmp, setActivEmp] = useState("");
    const [totalEmp, setTotalEmp] = useState("");
    const [searchResult, setSearchResult] = useState("")
    const [statusSearch, setStatusSearch] = useState("")

    const statusOptions = ["Active", "Inactive", "Resigned", "Terminated"];


    const searchedEmployees = employees.filter(emp => {
        const matchesSearch =
            emp.name.toLowerCase().includes(searchResult.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchResult.toLowerCase()) ||
            emp.department_name.toLowerCase().includes(searchResult.toLowerCase()) ||
            emp.position_title.toLowerCase().includes(searchResult.toLowerCase()) ||
            emp.address.toLowerCase().includes(searchResult.toLowerCase());
        const matchesStatus = statusSearch === "" || emp.status === statusSearch;
        return matchesSearch && matchesStatus;
    })



    const [totalDept, setTotalDept] = useState("");

    const getTotalDept = async () => {
        const result = await departmentCount()

        if (result)
            setTotalDept(result.data[0].totalDept)
        else
            toast.error("Error while count department")
    }

    const getAllEmployees = async () => {
        const result = await getAllEmp()

        if (!result)
            toast.error("Error while fetching employees")
        else {
            if (result.status == "success") {
                setEmployees(result.data)


                console.log(employees)

            }
            else

                toast.error("Error while fetching employees")
        }


    }


    const navigate = useNavigate();

    const onUpdate = (id) => {
        navigate(`/update-employee/${id}`)

    }

    useEffect(() => {
        getAllEmployees();
        getTotalDept();
    }, [])

    useEffect(() => {
        setTotalEmp(employees.length);
        setActivEmp(employees.filter(e => e.status === "Active").length)
    }, [employees])
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, employeeId: null, employeeName: "" });

    const handleDelete = (id, name) => {
        setDeleteConfirm({ show: true, employeeId: id, employeeName: name });
    }

    const confirmDelete = async () => {
        if (deleteConfirm.employeeId) {
            const result = await deleteEmployee(deleteConfirm.employeeId);
            if (!result)
                toast.error("Error while deleting employee")
            else {
                if (result.status == "success") {
                    toast.success("Employee deleted successfully")
                    getAllEmployees();
                }
                else
                    toast.error("Error while deleting employee");
            }
        }
        setDeleteConfirm({ show: false, employeeId: null, employeeName: "" });
    }

    const cancelDelete = () => {
        setDeleteConfirm({ show: false, employeeId: null, employeeName: "" });
    }

    const onLogout = () => {
        localStorage.clear()
        navigate('/login')
    }




    const loginUser = localStorage.getItem('company_name');
    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                {/* NAVBAR */}
                <nav className="p-4 shadow-sm bg-white mb-6">
                    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Left Side */}
                        <div className="flex items-center gap-4">
                            <MdGroups size={40} className="text-gray-700" />
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                                    Employee Dashboard
                                </h1>
                                <p className="text-gray-600 text-sm">Manage your team members</p>
                            </div>
                        </div>

                        {/* Center Welcome */}
                        <h1 className="text-lg md:text-xl flex gap-2 font-light text-gray-800">
                            <span>Welcome,</span> {loginUser}
                        </h1>

                        <div className="flex items-center gap-4">


                            {/* Right Logout */}
                            <button
                                onClick={() => navigate('/add-department')}

                                className="flex items-center space-x-2 px-4 py-2 rounded-lg shadow-lg       \ouhvcZcvbml,;'89` text-black hover:bg-gray-100 w-full md:w-auto justify-center border border-gray-200"
                            >
                                <span>Department</span>
                            </button>
                            <button
                                onClick={() => navigate('/add-position')}

                                className="flex items-center space-x-2 px-4 py-2 rounded-lg shadow-lg       \ouhvcZcvbml,;'89` text-black hover:bg-gray-100 w-full md:w-auto justify-center border border-gray-200"
                            >
                                <span>Position</span>
                            </button>
                            <button
                                onClick={onLogout}

                                className="flex items-center space-x-2 px-4 py-2 bg-red-500 rounded-lg shadow-sm text-white hover:bg-red-400 w-full md:w-auto justify-center"
                            >
                                <IoMdLogOut />
                                <span>Logout</span>
                            </button>

                        </div>
                    </div>
                </nav>

                {/* TOP CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-10 py-2">
                    <div className=" p-6 bg-white shadow-lg rounded-2xl font-semibold text-lg flex items-center justify-center">

                        <BsPersonLinesFill className="mr-2" /> Total Employees {totalEmp}
                    </div>
                    <div className="p-6 bg-white shadow-lg rounded-2xl font-semibold text-lg flex items-center justify-center">
                        Active Employees {activeEmp}
                    </div>
                    <div className="p-6 bg-white shadow-lg rounded-2xl font-semibold text-lg flex items-center justify-center">
                        Total Department {totalDept}
                    </div>
                </div>

                {/* EMPLOYEE LIST */}
                <div className="p-4 sm:p-8">
                    <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 max-w-7xl mx-auto">
                        {/* TOP CONTROL BAR */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b pb-4 gap-4">
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                                Employee List
                            </h2>

                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                {/* Search */}
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={searchResult}
                                        onChange={(e) => setSearchResult(e.target.value)}
                                        placeholder="Search employees..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>



                                {/* Status Filter */}
                                <select
                                    onChange={(e) => setStatusSearch(e.target.value)}
                                    className="w-full sm:w-40 pl-3 pr-8 py-2 border border-gray-300 rounded-lg">
                                    <option value="" >All status</option>
                                    {statusOptions.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>

                                {/* Add Employee Button */}
                                <Link
                                    to="/add-employee"
                                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 w-full sm:w-auto"
                                >
                                    <IoMdPersonAdd size={18} />
                                    <span>Add Employee</span>
                                </Link>
                            </div>
                        </div>

                        {/* EMPLOYEE TABLE */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-white">
                                    <tr>
                                        {TableHeader.map((header) => (
                                            <th
                                                key={header}
                                                className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {searchedEmployees.map((emp, indx) => (
                                        <tr key={indx} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium">{emp.name}</td>
                                            <td className="px-6 py-4 text-sm">{emp.email}</td>
                                            <td className="px-6 py-4 text-sm">{emp.department_name}</td>
                                            <td className="px-6 py-4 text-sm">{emp.position_title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full 
                    ${emp.status === "Active"
                                                            ? "bg-green-100 text-green-800"
                                                            : emp.status === "Inactive"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-red-200 text-red-800"
                                                        }`}
                                                >
                                                    {emp.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {new Date(emp.joining_date).toLocaleDateString("en-GB")}
                                            </td>
                                            <td className="px-6 py-4 text-sm">{emp.salary}</td>
                                            <td className="px-6 py-4 text-sm">{emp.address}</td>
                                            <td className="px-6 py-4 text-right text-sm">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => onUpdate(emp.id)}
                                                        className="p-2 text-indigo-600 border rounded-lg hover:bg-gray-100"
                                                    >
                                                        <FaUserEdit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(emp.id, emp.name)}
                                                        className="p-2 text-red-600 border rounded-lg hover:bg-gray-100"
                                                    >
                                                        <FaTrash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* DELETE CONFIRMATION MODAL */}
                {deleteConfirm.show && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                            <p className="mb-6">Are you sure you want to delete {deleteConfirm.employeeName}?</p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={cancelDelete}
                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                >

                                    No, Cancel
                                </button>

                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}