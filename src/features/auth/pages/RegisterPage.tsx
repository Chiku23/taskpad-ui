import { RegisterForm } from "../components/RegisterForm";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <div className="flex flex-col bg-app-canvas text-text-main min-h-screen justify-between items-center font-poppins">
      <div className="flex flex-col gap-8 border-2 border-app-border w-full max-w-sm lg:max-w-xl p-4 mt-30 rounded-lg">
        <div className="mt-4">
          <h1 className="text-text-main text-2xl">
            Create
            <span className="text-app-brand mx-2">Taskpad</span>
            account
          </h1>
          <p className="text-text-ghost">Register a free account</p>
        </div>

        <RegisterForm />

        <div>
          <Link
            to={"/login"}
            className="text-sm underline hover:text-app-brand"
          >
            <p>Login to existing account</p>
          </Link>
        </div>
      </div>

      <footer className="text-text-ghost text-sm mb-10">
        All rights reserved 
        <span className="mx-1">
        @Taskpad
        </span>
      </footer>
    </div>
  );
};
