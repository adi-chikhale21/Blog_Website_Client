import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import React, { useState } from "react";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItems } from "../../utils/localStorageManager";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await axiosClient.post("/auth/login", {
        email,
        password,
      });

      setItems(KEY_ACCESS_TOKEN, response.result.accessToken);
      Navigate("/");
    } catch (error) {
      console.log(await error.message);
    }
  }
  return (
    <div className="Login">
      <div className="Login-box">
        <h1 className="heading">Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            id="email"
            className="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            className="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input type="submit" className=" primary-btn submit" />
        </form>

        <p className="subheading">
          Don't have an account?<Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
