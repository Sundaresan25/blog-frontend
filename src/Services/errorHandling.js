export default function errorHandling(err) {
  let error = "Invalid Data Try Again Later";
  if (err.response && err?.response?.data) {
    // if (Object.keys(err.response.data).length > 0) {
    //   error = JSON.stringify(err.response.data.error);
    //   return error;
    // }

    if (err.response?.data?.error) {
      error = err.response.data.error;
      return error;
    }

    error = JSON.stringify(err?.response?.data);
    return error;
  }
  return error;
}
