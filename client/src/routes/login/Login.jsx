import React, { useContext, useState } from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {updateUser} = useContext(AuthContext);

  const nevigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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

      nevigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='login'>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Welcome Back</h1>
            <input type="text" name="username" id="username" placeholder='Username'/>
            <input type="password" name="password" id="password" placeholder='Password'/>
            <button disabled={loading}>Login</button>
            {error && <span className="error">{error}</span>}
            <Link to={"/register"}>{"Don't"} you have an account</Link>
          </form>
        </div>
        <div className="imgContainer">
          <img src="/bg.png" alt="" />
        </div>
    </div>
  )
}

export default Login