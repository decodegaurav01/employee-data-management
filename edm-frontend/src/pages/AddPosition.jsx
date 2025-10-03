import { useState, useEffect } from "react";
import { addPosition } from "../services/position"; 
import {  getDepartments } from "../services/department"; 
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export  function AddPosition() {
    const [positionTitle, setPositionTitle] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [departments, setDepartments] = useState([]);

    const navigate = useNavigate();

    const fetchDepartments = async () => {
        const result = await getDepartments();
        if (result && result.status === "success") {
            setDepartments(result.data);
        }
    };
    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleSubmit = async () => {
        if (positionTitle.length === 0 || departmentId.length === 0) {
            toast.warn("Please enter all fields");
            return;
        }

console.log("Submitting:", positionTitle, departmentId);
        const result = await addPosition(positionTitle, departmentId);
        if (result && result.status === "success") {
            toast.success("Position added successfully");
            navigate("/dashboard");
        } else {
            toast.error("Error while adding position");
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

                    <select
                        value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}
                        className="w-full border px-4 py-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                        <input
                            type="text"
                            value={positionTitle}
                            onChange={(e) => setPositionTitle(e.target.value)}
                            placeholder="Enter Position Title"
                            className="w-full border px-4 py-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        Add Position
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}