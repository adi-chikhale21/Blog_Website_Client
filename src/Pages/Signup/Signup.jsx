import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItems } from "../../utils/localStorageManager";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    try {
      let response = await axiosClient.post("/auth/signup", {
        name,
        email,
        password,
      });
      console.log(response);
      setItems(KEY_ACCESS_TOKEN, response.result.accessToken);
      Navigate("/");
    } catch (error) {
      console.log(await error.message);
    }
  }
  return (
    <div className="Signup">
      <div className="Signup-box">
        <h1 className="heading">Signup</h1>
        <form onSubmit={handleSignup}>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            type="text"
            className="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="text"
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
          <input
            type="submit"
            className=" primary-btn submit"
            value="Create an Account"
            onSubmit={handleSignup}
          />
        </form>

        <p className="subheading">
          Already have an account?<Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
