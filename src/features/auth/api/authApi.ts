import { axiosInstance } from "../../../lib/apiClient";
import type { 
    LoginPayload, 
    LoginResponse, 
    RegisterPayload,
    RegisterResponse,
    UserProfileResponse,
    LogoutResponse
} from "../types/authTypes";

export const loginUser = async(formData: LoginPayload): Promise<LoginResponse> => {
        return await axiosInstance.post("login", formData);
}

export const registerUser = async(formData: RegisterPayload): Promise<RegisterResponse> => {
        return await axiosInstance.post("/register", formData);    
}

export const getUser = async(): Promise<UserProfileResponse> => {
    return await axiosInstance.get("/me"); 
}

export const logoutUser = async(): Promise<LogoutResponse> => {
    return await axiosInstance.post("/logout")   
}