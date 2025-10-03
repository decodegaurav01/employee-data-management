import axios from "axios";
import { config } from "../config";

// CREATE Position
export async function addPosition(title, department_id) {
  try {
    const url = `${config.serverUrl}/position/add`;
    const body = { title, department_id };

    console.log("from axio : ", body)

    const response = await axios.post(url, body, {
      headers: { token: localStorage.getItem("token") }
    });

    if (response.status == 200)
      return response.data
    else
      return null;
  } catch (err) {
    console.error("Error creating position:", err);
    return null;
  }
}

// READ Positions (by department)
export async function getPositions(department_id) {
  try {
    const url = `${config.serverUrl}/position/${department_id}`;
    const response = await axios.get(url, {
      headers: { token: localStorage.getItem("token") }
    });

    if (response.status == 200)
      return response.data
    else
      return null;
  } catch (err) {
    console.error("Error fetching positions:", err);
    return null;
  }
}

