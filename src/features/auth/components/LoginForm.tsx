import { useState } from "react";
import {loginUser} from "../api/authApi";
import type { LoginPayload } from "../types/authTypes";

export const LoginForm = () => {
    const [formData, setFormData] = useState<LoginPayload>({
        emailInput: "",
        passwordInput: ""
    })
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const response = await loginUser(formData);
            if(response.status == "false"){
                setErrorMessage(response.message);
                // reset local storage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } else {
                // Store the token and user in local storage after successful login
                localStorage.setItem('token',JSON.stringify(response.data.token));
                localStorage.setItem('user',JSON.stringify(response.data));
                // TODO: Do what to do afterwards
                // Showing the message in the Error message section now for the time being
                setErrorMessage("Hello "+ response.data.name);
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Something went wrong! Please try again later.");
        }
    }
    return(
        <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-4">

            <input 
            className="bg-app-input-bg px-4 py-2 border-1 border-app-input-border outline-none rounded-lg"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.emailInput}
            onChange={(e) => setFormData({...formData, emailInput: e.target.value})}
            required
            />

            <input 
            className="bg-app-input-bg px-4 py-2 border-1 border-app-input-border outline-none rounded-lg"
            type="password"
            placeholder="Enter your Password"
            value={formData.passwordInput}
            onChange={(e) => setFormData({...formData, passwordInput: e.target.value})}
            required
            />

            <button
            className="bg-app-button hover:bg-app-button-hover py-2 mt-2 rounded-lg shadow-lg cursor-pointer"
            >Login</button>
            <div className="errorMsg text-red-500 pt-2">{errorMessage}</div>
        </form>
    )
}