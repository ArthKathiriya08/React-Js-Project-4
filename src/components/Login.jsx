import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();

    // Read the account saved during registration.
    const data = localStorage.getItem("user");

    if (!data) {
      alert("Please register first!");
      return;
    }

    const user = JSON.parse(data);

    if (email.trim().toLowerCase() === user.email.toLowerCase() &&
        password === user.password) {
      onLogin();
      navigate("/blogs");
    } else {
      alert("Invalid Email or Password!");
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3 auth-page">
      <div className="row w-100 auth-container">

        <div className="col-md-6 p-0">
          <div className="auth-image h-100 d-flex align-items-center justify-content-center"></div>
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center p-4 p-lg-5">
          <div className="w-100" style={{ maxWidth: "420px" }}>

            <div className="text-end small mb-5">
              Not a member? <Link to="/register">Register now</Link>
            </div>

            <h2 className="text-center fw-bold mb-2">Hello Again!</h2>

            <p className="text-center text-secondary mb-4">
              Welcome back! You've been missed.
            </p>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg auth-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  className="form-control form-control-lg auth-input"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-lg w-100 auth-button">
                Sign In
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
