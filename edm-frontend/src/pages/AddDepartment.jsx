import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { createDepartment } from "../services/department";

export  function AddDepartment() {
    const [departmentName, setDepartmentName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {

        if (departmentName.length == 0)
            toast.warn("Please enter the department name")
        else {
            const result = await createDepartment(departmentName)

            if (!result)
                toast.error("Error while adding department")
            else {
                if (result.status == 'success') {
                    toast.success("Department added successfully")
                    navigate("/dashboard")
                }
            }
        }

    };

    return (
        <div className=" flex justify-center items-center min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">

                <Link
                    to="/dashboard" // Link back to the main dashboard
                    className="inline-flex items-center space-x-2 px-4 py-2 mb-6 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 shadow-sm"
                >
                    {/* <ArrowLeft className="w-4 h-4" /> */}
                    <span>&lt; Back to Dashboard</span>
                </Link>

                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md ">

                    <div className="mb-8">

                    </div>
                    <h2 className="text-2xl font-bold mb-6 text-center">Add Department</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                            placeholder="Enter Department Name"
                            className="w-full border px-4 py-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                        >
                            Add Department
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
