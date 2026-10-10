import { useState } from "react";

export const LoginForm = () => {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInout, setPasswordInput] = useState("");

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return(
        <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-4">

            <input 
            className="bg-app-input-bg px-4 py-2 border-1 border-app-input-border outline-none rounded-lg"
            type="email"
            placeholder="Enter your email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
            />

            <input 
            className="bg-app-input-bg px-4 py-2 border-1 border-app-input-border outline-none rounded-lg"
            type="password"
            placeholder="Enter your Password"
            value={passwordInout}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
            />

            <button
            className="bg-app-button py-2 mt-10 rounded-lg shadow-lg"
            >Login</button>
        </form>
    )
}