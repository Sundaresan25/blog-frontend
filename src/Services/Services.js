import axios from "../axios-client";

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function AdminServices(method, url, data) {
  try {
    const response = await axios({
      method,
      url: `${baseUrl}/${url}`,
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
