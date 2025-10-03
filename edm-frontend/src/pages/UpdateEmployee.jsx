import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmployeeById, updateEmployee } from "../services/employee";
import { getDepartments } from "../services/department";
import { getPositions } from "../services/position";

export function UpdateEmployee() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [salary, setSalary] = useState("");
    const [status, setStatus] = useState("");
    const [address, setAddress] = useState("");
    const [position_id, setPosition_id] = useState("");
    const [department_id, setDepartment_id] = useState("");
    
    const [departments, setDepartments] = useState([])
    const [positions, setPositions] = useState([])
    
    const { id } = useParams();
    const navigate = useNavigate();

    const onUpdate = async () => {
        if (dob.length == 0)
            toast.warn("Please enter date of birth")
        else if (salary.length == 0)
            toast.warn("Please enter salary")
        else if (status.length == 0)
            toast.warn("Please enter status")
        else if (address.length == 0)
            toast.warn("Please enter address")
        else if (position_id.length == 0)
            toast.warn("Please enter position")
        else if (department_id.length == 0)
            toast.warn("Please enter department")
        else {
            
                const employeeData = {
                    name,
                    email,
                    dob,
                    salary,
                    status,
                    address,
                    department_id,
                    position_id
                };

                console.log("Updating employee with data: ", employeeData);
                
                const result = await updateEmployee(id, employeeData);

                console.log("Update result: ", result);
                if (result && result.status === 'success') {
                    toast.success("Employee updated successfully");
                    navigate('/dashboard');
                } else {
                    toast.error(result?.message || "Error updating employee");
                }
            } 
        }


    const getEmployeeDetails = async () => {
        const result = await getEmployeeById(id);

        console.log("Employee details: " + JSON.stringify(result))

        if (result && result.status === 'success' && result.data) {
            const employeeData = result.data[0];
            
            // Format date for input field
            const formatDateForInput = (dateString) => {
                if (!dateString) return '';
                if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
                    return dateString;
                }
                if (typeof dateString === 'string' && dateString.includes('T')) {
                    return dateString.split('T')[0];
                }
                const date = new Date(dateString);
                if (isNaN(date.getTime())) return '';
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };

            // Set all state values here
            setName(employeeData.name || '');
            setEmail(employeeData.email || '');
            setDob(formatDateForInput(employeeData.dob));
            setSalary(employeeData.salary || '');
            setStatus(employeeData.status || '');
            setAddress(employeeData.address || '');
            setDepartment_id(employeeData.department_id || '');
            setPosition_id(employeeData.position_id || '');
            
            // Load positions for the employee's department
            if (employeeData.department_id) {
                await getAllPositions(employeeData.department_id);
            }
        } else {
            toast.error("Error While fetching employee details");
        }
       
    }

    useEffect(() => {
        getEmployeeDetails();
        getAllDepartments();
    }, [id]);

    const getAllDepartments = async () => {
        const result = await getDepartments();
        if (result && result.status === 'success') {
            setDepartments(result.data);
        } else {
            toast.error("Error while fetching departments");
        }
    }

    const getAllPositions = async (departmentId) => {
        if (departmentId) {
            const result = await getPositions(departmentId);
            if (result && result.status === 'success') {
                setPositions(result.data);
            } else {
                toast.error("Error while fetching positions");
            }
        } else {
            setPositions([]);
        }
    }

    const handleDepartmentChange = async (e) => {
        const selectedDeptId = e.target.value;
        setDepartment_id(selectedDeptId);
        setPosition_id(""); // Reset position when department changes
        
        if (selectedDeptId) {
            await getAllPositions(selectedDeptId);
        } else {
            setPositions([]);
        }
    }

   

    return (
        

        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                {/* header  */}
                <div className="mb-8">
                    <Link to="/dashboard"
                        className="inline-flex items-center space-x-2 px-4 py-2 mb-6 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 shadow-sm">
                        <span>&lt; Back To Dashboard</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800">Update Employee</h1>
                </div>

                {/* body  */}
                <div className="bg-white p-8 rounded-2xl shadow-lg ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="fullName" className="block text-lg font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={name}
                                placeholder="Enter full name"
                                required
                                readOnly
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                placeholder="Enter email address"
                                required
                                readOnly
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            />
                        </div>
                        <div>
                            <label htmlFor="dob" className="block text-lg font-medium text-gray-700 mb-1">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={dob}
                                required
                                onChange={(e) => setDob(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            />
                        </div>
                        <div>
                            <label htmlFor="salary" className="block text-lg font-medium text-gray-700 mb-1">
                                Salary <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="number"
                                id="salary"
                                name="salary"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" 
                            />
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-lg font-medium text-gray-700 mb-1">
                                Status <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={status}
                                required
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full appearance-none px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            >
                                <option value="" disabled>Select status</option>
                                <option value="Active">Active</option>
                                <option value="InActive">InActive</option>
                                <option value="Resigned">Resigned</option>
                                <option value="Terminated">Terminated</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-1">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter Address"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            />
                        </div>

                        {/* Department Select */}
                        <div className="relative">
                            <label htmlFor="department" className="block text-lg font-medium text-gray-700 mb-1">
                                Department <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="department"
                                name="department"
                                onChange={handleDepartmentChange}
                                value={department_id}
                                required
                                className="w-full appearance-none px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            >
                                <option value="" disabled>Select department</option>
                                {departments.map((dept) => {
                                    return <option key={dept.id} value={dept.id}>{dept.name}</option>
                                })}
                            </select>
                        </div>

                        {/* Position Select */}
                        <div className="relative">
                            <label htmlFor="position" className="block text-lg font-medium text-gray-700 mb-1">
                                Position <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="position"
                                name="position"
                                value={position_id}
                                onChange={(e) => setPosition_id(e.target.value)}
                                required
                                className="w-full appearance-none px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            >
                                <option value="" disabled>Select position</option>
                                {positions.map((pos) => {
                                    return <option key={pos.id} value={pos.id}>{pos.title}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-7 flex justify-center items-center gap-5">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition duration-150"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={onUpdate}
                            className="space-x-2 px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-700 transition duration-200 shadow-md"
                        >
                            <span>Update</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}