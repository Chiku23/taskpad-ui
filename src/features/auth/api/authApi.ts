import { BASE_URL } from "../../../lib/apiClient";
import type{ LoginPayload } from "../types/authTypes";

//todo: replace unknown type with response interface/type
async function loginUser(formData: LoginPayload): Promise<unknown> {
    try{

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
    catch(error){
        return{
            stats: false,
            message: error instanceof Error ? error.message : "Error occured"
        }
    }
}

export { loginUser };