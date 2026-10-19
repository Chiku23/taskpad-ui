import { BASE_URL } from "../../../lib/apiClient";
import type { 
    LoginPayload, 
    LoginResponse, 
    RegisterPayload,
    RegisterResponse
} from "../types/authTypes";

//todo: replace unknown type with response interface/type
export const loginUser = async(formData: LoginPayload): Promise<LoginResponse> => {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: formData.emailInput,
                password: formData.passwordInput
            })
        });
        return await response.json();
}

export const registerUser = async(formData: RegisterPayload): Promise<RegisterResponse> => {
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: formData.nameInput,
                email: formData.emailInput,
                password: formData.passwordInput,
                confirmpassword: formData.confirmpasswordInput
            })
        })
        try {
            return await response.json();
        } catch {
            throw new Error("Unexpected response from server. Please try again.");
        }
}

export const getUser = async() => {
    const token = localStorage.getItem("token");
    if(!token) {
        throw new Error("No token found");
    }
    
    const response = await fetch(`${BASE_URL}/me`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if(!response.ok){
        throw new Error("Failed to fetch");
    }

    return await response.json();
}