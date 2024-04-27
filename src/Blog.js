import React, { useState, useRef } from "react";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase/fb";
import Time from "./Time";
import "./Blog.css";
const Blog = () => {
  const [checker, setChecker] = useState({ url: null });
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const handleTitle = (e) =>
    setChecker((pre) => ({ ...pre, title: e.target.value }));
  const handleDescrption = (e) =>
    setChecker((pre) => ({ ...pre, Des: e.target.value }));
  const handleTags = (e) =>
    setChecker((pre) => ({ ...pre, Tags: e.target.value }));
  const handleCancel = () => setImage(null);
  async function handleBackendBlog(url) {
    console.log("worked");
    const time = Time();
    let res = await axios.post("http://localhost:5000/Blog", {
      Image: url,
      Title: checker.title,
      Des: checker.Des,
      Tags: checker.Tags,
      Date: time,
    });
    console.log(res);
    setChecker({ url: null });
    setImage(null);
  }
  function uploadFile() {
    const uploadTask = uploadBytesResumable(
      ref(storage, `/images/${image.name}`),
      image
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error.message);
      },
      () => {
        console.log("Upload successful");
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("worked");
            handleBackendBlog(downloadURL);
            setChecker((pre) => ({ ...pre, url: downloadURL }));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  }
  const imageURL = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setChecker((pre) => ({ ...pre, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(file);
    imageURL(file);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    imageURL(file);
  };
  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  async function handleUploadToBlog() {
    if (checker.title && checker.Des) {
      if (checker.url === null) {
        uploadFile();
      }
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
        {checker.image ? (
          <>
            <img
              src={checker.image}
              alt="Dropped"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
            <button
              className="cancel_image_button"
              onClick={() => handleCancel()}
            >
              <p></p>
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
