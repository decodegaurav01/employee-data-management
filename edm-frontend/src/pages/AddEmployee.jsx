import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addEmployee } from "../services/employee";
import { getDepartments } from "../services/department";
import { getPositions } from "../services/position";

export function AddEmployee() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [position_id, setPosition_id] = useState("");
  const [department_id, setDepartment_id] = useState("");

  const statusOptions = ["Active", "Inactive", "Resigned", "Terminated"];

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setDob("");
    setJoiningDate("");
    setSalary("");
    setStatus("");
    setAddress("");
    setPosition_id("");
    setDepartment_id("");
  };
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const navigate = useNavigate()



  const getAlldepartment = async () => {
    const result = await getDepartments()
    if (!result)
      toast.error("Error while fetching department")
    else {
      if (result.status == 'success') {
        console.log(result.data)
        setDepartments(result.data)
      }
    }

  }

  const getAllPositions = async (department) => {
    setDepartment_id(department)
    if (department) {
      const result = await getPositions(department)

      if (!result) {

        toast.error("Error while fetching positions")
        setPositions([])
      }
      else {
        if (result.status == 'success') {
          console.log(result.data)
          setPositions(result.data)
        }
      }
    }

  }


  useEffect(() => {
    getAlldepartment()


  }, [])

  const onAddingEmployee = async () => {
    if (fullName.length == 0)
      toast.warn("Please enter full name")
    else if (email.length == 0)
      toast.warn("Please enter email");
    else if (dob.length == 0)
      toast.warn("Please enter Date of birth")
    else if (joiningDate.length == 0)
      toast.warn("Please enter joining date")
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


      const result = await addEmployee(fullName, email, dob, joiningDate, salary, status, address, position_id, department_id)
      if (!result)
        toast.error("Error While add employee")
      else {
        if (result.status == 'success') {
          toast.success("Employee add successfully....")
          resetForm();
          navigate('/dashboard')

        }

      }
    }

  }
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header Section */}
        <div className="mb-8">
          <Link
            to="/dashboard" // Link back to the main dashboard
            className="inline-flex items-center space-x-2 px-4 py-2 mb-6 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 shadow-sm"
          >
            {/* <ArrowLeft className="w-4 h-4" /> */}
            <span>&lt; Back to Dashboard</span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-800">Add New Employee</h1>

        </div>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-2xl shadow-lg ">

          <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4">
            Employee Information
          </h3>

          {/* <form onSubmit={handleSubmit} className="space-y-6"> */}

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-lg font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter full name"
                onChange={e => setFullName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>

            {/* Email Address Input */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>

            {/* Date of Birth Input */}
            <div>
              <label htmlFor="dob" className="block text-lg font-medium text-gray-700 mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input

                type="date"
                id="dob"
                name="dob"
                onChange={e => setDob(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>
            {/* Joining Date Input */}
            <div>
              <label htmlFor="joiningDate" className="block text-lg font-medium text-gray-700 mb-1">
                Joining Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="joiningDate"
                name="joiningDate"
                onChange={e => setJoiningDate(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>

            {/* Salary Input */}
            <div>
              <label htmlFor="salary" className="block text-lg font-medium text-gray-700 mb-1">Salary
                <span className="text-red-500">*</span>
              </label>
              <input type="number"
                id="salary"
                name="salary"
                placeholder="Enter salary"
                onChange={e => setSalary(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" />

            </div>
            {/* Status Input  */}
            <div>
              <label htmlFor="position" className="block text-lg font-medium text-gray-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="position"
                name="position"
                onChange={e => setStatus(e.target.value)}
                required
                className="w-full appearance-none px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              >
                <option value="" >Select status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}

              </select>

            </div>

            {/* Address  */}
            <div>
              <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter  address"
                onChange={e => setAddress(e.target.value)}
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
                value={department_id}
                // onChange={e => setDepartment(e.target.value)}
                onChange={e => getAllPositions(e.target.value)}
                required
                className="w-full appearance-none px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              >
                <option value="" disabled>Select department</option>
                {departments && departments.map((dept) => (

                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
              {/* <ArrowLeft className="absolute right-3 top-[3.2rem] transform rotate-90 w-4 h-4 text-gray-400 pointer-events-none" /> */}
            </div>

            {/* Position Select */}
            <div className="relative">
              <label htmlFor="position" className="block text-lg font-medium text-gray-700 mb-1">
                Position <span className="text-red-500">*</span>
              </label>
              <select
                id="position"
                name="position"
                onChange={e => setPosition_id(e.target.value)}
                required
                className="w-full appearance-none px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              >
                <option value="" >Select position</option>
                {positions && positions.map((pos) => (
                  <option key={pos.id} value={pos.id}>{pos.title}</option>
                ))}
              </select>
              {/* <ArrowLeft className="absolute right-3 top-[3.2rem] transform rotate-90 w-4 h-4 text-gray-400 pointer-events-none" /> */}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 flex justify-center gap-5">
              <button
                onClick={() => navigate('/dashboard  ')}
                type="button"
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={onAddingEmployee}
                className=" space-x-2 px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-700 transition duration-200 shadow-md"
              >
                {/* <Plus className="w-5 h-5" /> */}
                <span>Add Employee</span>
              </button>
            </div>
          </div>



        </div>
      </div>
    </div>
  )
}