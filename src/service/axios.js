import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, 
});

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Centralized error handling
    if (error.response) {
      const statusCode = error.response.status;
      const backendMessage = error.response.data.message; 

      // Use backend error message or fallback to a generic one
      let errorMessage = backendMessage || "Something went wrong.";

      if (!backendMessage) {
        // Generic error messages based on status code
        switch (statusCode) {
          case 400:
            errorMessage = "Bad Request: Please check your input.";
            break;
          case 401:
            errorMessage = "Unauthorized: Please log in again.";
            break;
          case 403:
            errorMessage = "Forbidden: You don't have permission to access this resource.";
            break;
          case 404:
            errorMessage = "Not Found: The requested resource could not be found.";
            break;
          case 409:
            errorMessage = "Conflict: Duplicate data or conflicting request.";
            break;
          case 500:
            errorMessage = "Internal Server Error: Please try again later.";
            break;
          default:
            errorMessage = "An unexpected error occurred. Please try again.";
        }
      }

      // Log the error 
      console.error(`[Error ${statusCode}]: ${errorMessage}`);

      error.message = errorMessage;
    } else if (error.request) {
      error.message = "Network error: Unable to connect to the server. Please check your connection.";
    } else {
      error.message = error.message || "An unknown error occurred.";
    }
    return Promise.reject(error);
  }
);

export default Api;