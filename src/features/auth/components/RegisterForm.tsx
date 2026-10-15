import { useState } from "react";
import type { RegisterPayload } from "../types/authTypes";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<RegisterPayload>({
    nameInput: "",
    emailInput: "",
    passwordInput: "",
    confirmpasswordInput: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setErrorMessage("");
      const response = await registerUser(formData);

      if (response.status === "false") {
        setErrorMessage(response.message);
      } else {
        //After succesful registration redirect user to login
        navigate("/login", {
          state: {
            message: "Registration successful, Please log in",
          },
        });
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Error occured")
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="bg-app-input-bg px-4 py-2 border-1 border-app-input-border outline-none rounded-lg"
        type="text"
        placeholder="Enter your Username"
        value={formData.nameInput}
        onChange={(e) =>
          setFormData({ ...formData, nameInput: e.target.value })
        }
        required
      />

      <input
        className="bg-app-input-bg px-4 py-2 border-1 border-app-input-border outline-none rounded-lg"
        type="email"
        placeholder="Enter your email"
        value={formData.emailInput}
        onChange={(e) =>
          setFormData({ ...formData, emailInput: e.target.value })
        }
        required
      />

      <input
        className="bg-app-input-bg px-4 py-2 border-1 border-app-input-border outline-none rounded-lg"
        type="password"
        placeholder="Enter your Password"
        value={formData.passwordInput}
        onChange={(e) =>
          setFormData({ ...formData, passwordInput: e.target.value })
        }
        required
      />

      <input
        className="bg-app-input-bg px-4 py-2 border-1 border-app-input-border outline-none rounded-lg"
        type="password"
        placeholder="Confirm your password"
        value={formData.confirmpasswordInput}
        onChange={(e) =>
          setFormData({ ...formData, confirmpasswordInput: e.target.value })
        }
        required
      />

      <div className="text-red-500 pt-2 text-sm">{errorMessage}</div>

      <button className="bg-app-button py-2 mt-10 rounded-lg shadow-lg">
        Register
      </button>
    </form>
  );
};
