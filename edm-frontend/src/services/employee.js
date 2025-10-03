import axios from "axios";
import { config } from "../config";

export async function addEmployee(fullName, email, dob, joiningDate, salary, status, address, position, department) {
    try {

        const url = `${config.serverUrl}/employee/add`
        const body = {
            fullName,
            email,
            dob,
            joiningDate,
            salary,
            status,
            address,
            position,
            department
        }
        console.log("from frontend: ", body)
        const response = await axios.post(url, body, { headers: { token: localStorage.getItem('token') } })
        if (response.status == 200)
            return response.data
        else
            return null;


    } catch (e) {
        console.log(e)
    }
}

export async function updateEmployee(id, employeeData) {
    try {
        const url = `${config.serverUrl}/employee/update/${id}`
        const body = {
            dob: employeeData.dob,
            salary: employeeData.salary,
            status: employeeData.status,
            address: employeeData.address,
            position: employeeData.position_id,
            department: employeeData.department_id
        }

        console.log("Updating employee with data:", body); // Debug log
        const token = localStorage.getItem('token')
        // console.log("using token: ", token)
        const response = await axios.put(url, body, { headers: { token: token } })

        console.log("Update response:", response); // Debug log
        if (response.status == 200)
            return response.data
        else
            return null;

    } catch (e) {
        console.log(e)
    }
}

export async function getAllEmployees() {
    try {
        const url = `${config.serverUrl}/employee/getAll`
        const response = await axios.get(url, { headers: { token: localStorage.getItem('token') } })
        if (response.status == 200)
            return response.data
        else
            return null;
    } catch (e) {
        console.log(e)
    }
}
export async function deleteEmployee(id) {
    try {
        const url = `${config.serverUrl}/employee/delete/${id}`
        const response = await axios.delete(url, { headers: { token: localStorage.getItem('token') } })
        if (response.status == 200)
            return response.data
        else
            return null;
    } catch (e) {
        console.log(e)
    }
}

export async function getEmployeeById(id) {
    try {
        const url = `${config.serverUrl}/employee/getById/${id}`

        const response = await axios.get(url, { headers: { token: localStorage.getItem('token') } })
        if (response.status == 200)
            return response.data
        else
            return null;
    } catch (e) {
        console.log(e)
    }
}

