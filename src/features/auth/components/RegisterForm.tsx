import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { RegisterPayload } from "../types/authTypes";
import { useRegister } from "../hooks/useRegister";

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<RegisterPayload>({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const navigate = useNavigate();
  const { mutateRegister, isPending } = useRegister();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setErrorMessage("");

    mutateRegister(formData, {
      onSuccess: (response) => {
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
      },
      onError: (error) => {
        setErrorMessage(error.message || "An unexpected errro happended")
      }
    });
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="bg-app-input-bg px-4 py-2 border-1 border-app-input-border outline-none rounded-lg"
        type="text"
        placeholder="Enter your Username"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <input
        className="bg-app-input-bg px-4 py-2 border-1 border-app-input-border outline-none rounded-lg"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <input
        className="bg-app-input-bg px-4 py-2 border-1 border-app-input-border outline-none rounded-lg"
        type="password"
        placeholder="Enter your Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />

      <input
        className="bg-app-input-bg px-4 py-2 border-1 border-app-input-border outline-none rounded-lg"
        type="password"
        placeholder="Confirm your password"
        value={formData.confirmpassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmpassword: e.target.value })
        }
        required
      />

      <div className="text-red-500 pt-2 text-sm">{errorMessage}</div>

      <button
        className={`bg-app-button hover:bg-app-button-hover py-2 mt-2 rounded-lg shadow-lg cursor-pointer ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isPending}
      >
        {isPending ? "Creating account..." : "Register"}
      </button>
    </form>
  );
};
