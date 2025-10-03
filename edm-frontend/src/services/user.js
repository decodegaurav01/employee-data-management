import axios from "axios";
import { config } from "../config"
export async function registerUser(company_name, email, password) {

    try {
        const url = `${config.serverUrl}/user/registration`
        const body = {
            company_name,
            email,
            password,

        }
        const response = await axios.post(url, body)

        console.log("from axios: ", response.data)

        
            return response.data
        
    } catch (e) {
        console.log(e)
    }
}
// export async function registerUser(company_name, email, password) {
//     try {
//         const url = `${config.serverUrl}/user/registration`;
//         const body = { company_name, email, password };
//         const response = await axios.post(url, body);

//         console.log("from axios: ", response.data);
//         return response.data; // always return data from backend
//     } catch (e) {
//         console.log("Axios error:", e);

//         // If backend sent a response with error
//         if (e.response && e.response.data) {
//             return e.response.data; // This will have status and message
//         }

//         // Generic fallback
//         return { status: "error", message: "Network or server error" };
//     }
// }

export async function login(email, password) {
    try {
        const url = `${config.serverUrl}/user/login`
        const body = {
            email,
            password,
        }
        console.log("from axio: ", email, password)

        const response = await axios.post(url, body)
        
        console.log("res from axios: ", response)
        if (response.status == 200)
            return response.data
        else
            return null;
    } catch (e) {
        console.log(e)
    }
}
