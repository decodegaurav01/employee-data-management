import axios from "axios";
import { config } from "../config";

export async function createDepartment(name) {
    try {
        const url = `${config.serverUrl}/department/add`;

        const body = {
            name: name
        }
        const response = await axios.post(url, body, {
            headers: { token: localStorage.getItem("token") }
        });

        if (response.status == 200)
            return response.data
        else
            return null;
    } catch (err) {
        console.error("Error creating department:", err);
        return null;
    }
}


export async function getDepartments() {
    try {
        const url = `${config.serverUrl}/department/get`;
        const response = await axios.get(url, {
            headers: { token: localStorage.getItem("token") }
        });

        if (response.status == 200)
            return response.data
        else
            return null;
    } catch (err) {
        console.error("Error fetching departments:", err);
        return null;
    }
}

export async function departmentCount() {

    try {
        const url = `${config.serverUrl}/department/count`

        const response = await axios.get(url, { headers: { token: localStorage.getItem('token') } })
        if (response.status == 200)
            return response.data
        else
            return null;

    } catch (e) {
        console.log(e)
    }
}