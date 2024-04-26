import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./logo.png";
import "./Login.css";
const Login = ({ data }) => {
  const [checker, setChecker] = useState({
    signup: false,
  });
  const navigation = useNavigate();
  useEffect(() => {
    if (data) {
      setChecker({ signup: true });
    } else {
      setChecker({ signup: false });
    }
  }, [data]);
  const handleUsername = (e) =>
    setChecker((pre) => ({ ...pre, name: e.target.value }));
  const handleEmail = (e) =>
    setChecker((pre) => ({ ...pre, email: e.target.value }));
  const handlePassword = (e) =>
    setChecker((pre) => ({ ...pre, Pass: e.target.value }));
  const handleSignup = () =>
    setChecker({ signup: true, name: "", email: "", Pass: "" });
  const handleSignIn = () =>
    setChecker({ signup: false, name: "", email: "", Pass: "" });
  async function createUser() {
    if (
      (checker.name !== undefined) &
      (checker.email !== undefined) &
      (checker.Pass !== undefined)
    ) {
      console.log("check");
      let res = await axios.post("http://localhost:5000/signup", {
        name: checker.name,
        Email: checker.email,
        Pass: checker.Pass,
      });
      if (res.status === 201) {
        setChecker((pre) => ({ ...pre, error: res.data }));
      }
      if (res.status === 200) {
        navigation("/");
      }
    } else {
      setChecker((pre) => ({ ...pre, error: "Fill the Form" }));
    }
  }
  async function UserLoged() {
    console.log(checker);
    if ((checker.email !== undefined) & (checker.Pass !== undefined)) {
      console.log("check");
      let res = await axios.post("http://localhost:5000/login", {
        Email: checker.email,
        Pass: checker.Pass,
      });
      console.log(res.data);
      if (res.status === 201) {
        setChecker((pre) => ({ ...pre, error: res.data }));
      }
      if (res.status === 200) {
        navigation("/");
      }
    } else {
      setChecker((pre) => ({ ...pre, error: "Fill the Form" }));
    }
  }
  return (
    <section id="login_signUpForm">
      <div
        className={checker.signup ? "container active" : "container"}
        id="container"
      >
        <div className="form-container sign-up">
          <div id="form">
            <div id="Applogo">
              <img src={logo} alt="logo" />
            </div>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              value={checker.name ? checker.name : ""}
              onChange={handleUsername}
            />
            <input
              type="email"
              placeholder="Email"
              value={checker.email ? checker.email : ""}
              onChange={handleEmail}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handlePassword}
              value={checker.Pass ? checker.Pass : ""}
            />
            <p>
              Already have a Account?
              <span onClick={handleSignIn}> Sign In</span>
            </p>
            <p id="error">{checker.error ? checker.error : ""}</p>
            <button onClick={createUser}>Sign Up</button>
          </div>
        </div>
        <div className="form-container sign-in">
          <div id="form">
            <div id="Applogo">
              <img src={logo} alt="logo" />
            </div>
            <h1>Sign In</h1>
            <input
              type="email"
              placeholder="Email"
              onChange={handleEmail}
              value={checker.email ? checker.email : ""}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handlePassword}
              value={checker.Pass ? checker.Pass : ""}
            />
            <p>
              Don't have a Account?<span onClick={handleSignup}> Sign Up</span>
            </p>
            <p id="error">{checker.error ? checker.error : ""}</p>
            <button onClick={UserLoged}>Sign In</button>
          </div>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>
                Please sign in to access your account, then click the 'Sign In'
                button to proceed.
              </p>
              <button className="hidden" id="login" onClick={handleSignIn}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Ready to get started? Click 'Sign Up' to create your account and
                unlock all the features.
              </p>
              <button className="hidden" id="register" onClick={handleSignup}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
