import axios from "axios";
// Define the API endpoint
export const BASE_URL = "http://localhost:8000/api";


export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, //Allows axios to attach cookie with every req
    timeout: 10000
})

axiosInstance.interceptors.response.use((response) => {

    //If req was success but status is false(string)
    if(response.data.status === "false"){
        return Promise.reject(new Error(response.data.message || "Error occured"));
    }
    return response.data;

}, (error) => {
    let errorMessage = "An unexpected error cooured";
    if(error.response){
        errorMessage = error.response.data.message || errorMessage;
    }
    else if(error.message){
        errorMessage = error.message;
    }

    return Promise.reject(new Error(errorMessage));
})
