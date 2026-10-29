import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      name: name,
      email: email,
      password: password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful!");

    navigate("/login");
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3 auth-page">
      <div className="row w-100 auth-container">

        {/* Left Image Section */}
        <div className="col-md-6 p-0">
          <div className="auth-image h-100"></div>
        </div>

        {/* Right Registration Section */}
        <div className="col-md-6 d-flex align-items-center justify-content-center p-4 p-lg-5">
          <div className="w-100" style={{ maxWidth: "420px" }}>

            <div className="text-end mb-5 small">
              Already a member?{" "}
              <Link to="/login">Sign in</Link>
            </div>

            <h2 className="text-center fw-bold mb-2">
              Create Account
            </h2>

            <p className="text-center text-secondary mb-4">
              Join us and get started!
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg auth-input"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-lg w-100 auth-button"
              >
                Register
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
