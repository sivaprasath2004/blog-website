import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Blog from "./Blog";
import Login from "./Login";
import Blogs from "./Blogs";
import "./App.css";
import axios from "axios";
import { createContext } from "react";
const DataProviding = createContext();
const App = () => {
  const [data, setData] = useState(null);
  const fetch = async () => {
    let res = await axios.post("http://localhost:5000/blogs", {
      id: process.env.id,
    });
    setData(res.data);
    console.log(res);
  };
  useEffect(() => {
    fetch();
  }, []);
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
      <DataProviding.Provider value={data || {}}>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/signIn" element={<Login data={false} />} />
          <Route path="/signup" element={<Login data={true} />} />
        </Routes>
      </DataProviding.Provider>
    </main>
  );
};

export default App;
export { DataProviding };
