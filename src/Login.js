import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import "./Login.css";
const Login = ({ data }) => {
  const [checker, setChecker] = useState({ signup: false });
  useEffect(() => {
    if (data) {
      setChecker((pre) => ({ ...pre, signup: true }));
    } else {
      setChecker((pre) => ({ ...pre, signup: false }));
    }
  }, [data]);
  return (
    <section id="login_signUpForm">
      <div className="container">
        <div className="brand-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="brand-title">
          {" "}
          {!checker.signup ? "Sign in" : "Sign up"}
        </div>
        <div className="inputs">
          {checker.signup ? (
            <>
              <label>USER NAME</label>
              <input type="email" placeholder="USER NAME" />
            </>
          ) : (
            <></>
          )}
          <label>EMAIL</label>
          <input type="email" placeholder="example@test.com" />
          <label>PASSWORD</label>
          <input type="password" placeholder="Password" />
          <p id="error">{checker.error ? checker.error : " "}</p>
          <button type="submit">
            {!checker.signup ? "SIGN IN" : "SIGN UP"}
          </button>
          <p id="createORsignup">
            {checker.signup
              ? "Already have a Account?"
              : "Don`t have a Acccount?"}
            <span
              id="login"
              onClick={() =>
                setChecker((pre) => ({ ...pre, signup: !checker.signup }))
              }
            >
              {checker.signup ? "Sing In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
