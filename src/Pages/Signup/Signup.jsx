import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.scss";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="Signup">
      <div className="Signup-box">
        <h1 className="heading">Signup</h1>
        <form>
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
