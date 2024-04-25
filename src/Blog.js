import React, { useState, useRef } from "react";
import axios from "axios";
import "./Blog.css";
const Blog = () => {
  const [checker, setChecker] = useState({});
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const handleTitle = (e) =>
    setChecker((pre) => ({ ...pre, title: e.target.value }));
  const handleDescrption = (e) =>
    setChecker((pre) => ({ ...pre, Des: e.target.value }));
  const handleTags = (e) =>
    setChecker((pre) => ({ ...pre, Tags: e.target.value }));
  const handleCancel = () => setImage(null);
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  async function handleUploadToBlog() {
    if (image && checker.title && checker.Des) {
      let res = await axios.post("http://localhost:5000/Blog", {
        Image: image,
        title: checker.title,
        Des: checker.Des,
        Tags: checker.Tags,
      });
      console.log(res);
    } else {
      console.log(false);
    }
  }
  return (
    <section id="Blog">
      <div className="input_container" id="Title">
        <input type="text" placeholder="Title" onChange={handleTitle} />
      </div>
      <div
        className="Drag_Drop"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {image ? (
          <>
            <img
              src={image}
              alt="Dropped"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
            <button
              className="cancel_image_button"
              onClick={() => handleCancel()}
            >
              cancel
            </button>
          </>
        ) : (
          <button onClick={handleUploadButtonClick}>
            <p>Drag &amp; drop an image here or click to upload</p>
          </button>
        )}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleInputChange}
          ref={fileInputRef}
        />
      </div>
      <textarea
        placeholder="Description"
        style={{ resize: "vertical" }}
        onChange={handleDescrption}
      />
      <div className="input_container" id="Tags">
        <input type="text" placeholder="Tags" onChange={handleTags} />
      </div>
      <button id="upload" onClick={handleUploadToBlog}>
        Upload
      </button>
    </section>
  );
};

export default Blog;
