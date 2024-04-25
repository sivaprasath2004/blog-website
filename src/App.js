import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Blog from "./Blog";
import Login from "./Login";
import Blogs from "./Blogs";
import "./App.css";
const App = () => {
  return (
    <main>
      <header>
        <h1>Blog</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/blog">Create</Link>
          <Link to="/signIn">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/signIn" element={<Login data={false} />} />
        <Route path="/signup" element={<Login data={true} />} />
      </Routes>
    </main>
  );
};

export default App;
