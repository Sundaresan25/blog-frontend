import axios from "../axios-client";

const baseUrl = process.env.REACT_APP_BASE_URL;

/**
 * Performs an HTTP request using Axios.
 * @param {string} method - The HTTP method (e.g., GET, POST, PUT, DELETE).
 * @param {string} url - The URL for the request.
 * @param {object} data - The data to send with the request (optional).
 * @returns {Promise} - A Promise that resolves to the response data.
 */
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
