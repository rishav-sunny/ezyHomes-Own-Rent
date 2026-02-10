import React, { useContext, useEffect, useState } from 'react'
import './login.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const {updateUser} = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.flash) {
      setSuccess(location.state.flash);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,password
      })

      // console.log(res.data);
      // localStorage.setItem("user", JSON.stringify(res.data));
      updateUser(res.data);

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to login. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  }

  const handleSkipLogin = () => {
    navigate("/");
  };

  return (
    <div className='login'>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Welcome Back</h1>
            <input type="text" name="username" id="username" placeholder='Username'/>
            <input type="password" name="password" id="password" placeholder='Password'/>
            <button disabled={loading}>Login</button>
            {success && <div className="noticeBanner success">{success}</div>}
            {error && <span className="error">{error}</span>}
            <Link to={"/register"}>{"Don't"} you have an account</Link>
            <button type="button" className="skipButton" onClick={handleSkipLogin}>
              Skip and Browse as Guest
            </button>
          </form>
        </div>
        <div className="imgContainer">
          <img src="/bg.png" alt="" />
        </div>
    </div>
  )
}

export default Login