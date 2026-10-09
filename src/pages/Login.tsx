import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");

  const submitForm = () => {
    console.log(email);
  };
  return (
    <>
      <div>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="submitButton" onClick={() => submitForm()}>
          Click
        </button>
      </div>
    </>
  );
}

export default Login;
