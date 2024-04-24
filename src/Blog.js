import React, { useState, useRef } from "react";
import "./Blog.css";
const Blog = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
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
  return (
    <section id="Blog">
      <div className="input_container" id="Title">
        <input type="text" placeholder="Title" />
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
              onClick={() => console.log("Hello")}
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
      <textarea placeholder="Description" style={{ resize: "vertical" }} />
      <div className="input_container" id="Tags">
        <input type="text" placeholder="Tags" />
      </div>
    </section>
  );
};

export default Blog;
