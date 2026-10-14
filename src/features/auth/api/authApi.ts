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
        return await response.json();
}