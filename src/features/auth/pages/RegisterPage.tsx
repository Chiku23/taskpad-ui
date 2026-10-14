import { Link } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="flex flex-col bg-app-canvas text-text-main min-h-screen justify-center items-center font-poppins">
      <div className="flex flex-col gap-8 border-1 border-app-border w-sm lg:w-xl p-4 rounded-lg bg-app-card">

        <div className="mt-2">
          <h1 className="text-text-main text-2xl mb-1">Register</h1>
          <p className="text-text-muted text-[12px]">Create a new account</p>
        </div>

        <RegisterForm />

        <div className="text-sm">
            <p>
              Already have an account?{" "}
              <Link to={"/login"} className="underline text-app-button hover:text-app-button-hover">
                Click here
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
}

