import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    try {
      const data = await loginUser({ email: email.trim(), password });
      setUser({ _id: data._id, username: data.username, email: data.email }, data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your email and password.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="auth-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          required
        />
        <button type="submit">Login</button>
        <p>Don&apos;t have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;