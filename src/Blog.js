import React, { useState, useRef } from "react";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase/fb";
import Time from "./Time";
import "./Blog.css";
const Blog = () => {
  const [checker, setChecker] = useState({
    url: null,
    Uploading: false,
    progress: 50,
  });
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const color = [
    {
      color: " #FF0000",
    },
    {
      color: "#FFA500",
    },
    {
      color: "#008000",
    },
    {
      color: "rgb(10 187 255)",
    },
    {
      color: "#0000FF",
    },
    {
      color: "#800080",
    },
  ];
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
      Tags: tags,
      Date: time,
    });
    console.log(res);
    setChecker({
      url: null,
      title: undefined,
      Des: undefined,
      Tags: undefined,
      Uploading: false,
    });
    setImage(null);
    setTags([]);
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
        setChecker((pre) => ({ ...pre, progress: progress }));
        console.log(`Upload is ${checker.progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error.message);
      },
      () => {
        console.log("Upload successful");
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            handleBackendBlog(downloadURL);
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
        setChecker((pre) => ({ ...pre, Uploading: true }));
        uploadFile();
      }
    } else {
      console.log(false);
    }
  }
  function handleTagsContainer() {
    if (checker.Tags) {
      setTags([...tags, `#${checker.Tags}`]);
      setChecker((pre) => ({ ...pre, Tags: undefined }));
    } else {
      console.log(false);
    }
  }
  function handleClear(item) {
    let result = tags.filter((ele) => ele !== item);
    setTags(result);
  }
  return (
    <section id={checker.Uploading ? "Uploading" : "Blog"}>
      {checker.Uploading ? (
        <>
          <div className="progress"></div>
          <h1>Please do not refresh the page...</h1>
        </>
      ) : (
        <>
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
          <div className="Tag_list">
            {tags?.map?.((item, index) => (
              <div id="tag" key={`tags_${index}`}>
                <p
                  key={`tag${index}`}
                  style={{
                    color: color[index > 6 ? index - 6 : index]?.color,
                  }}
                >
                  {item}
                </p>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/8303/8303684.png"
                  alt="close"
                  key={`image_close${index}`}
                  onClick={() => handleClear(item)}
                />
              </div>
            ))}
          </div>
          <div className="input_container" id="Tags">
            <p>#</p>
            <input
              type="text"
              placeholder="Tags"
              value={checker.Tags ? checker.Tags : ""}
              onChange={handleTags}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/1828/1828817.png"
              alt="addIcon"
              onClick={() => handleTagsContainer()}
            />
          </div>
          <button id="upload" onClick={handleUploadToBlog}>
            Upload
          </button>
        </>
      )}
    </section>
  );
};

export default Blog;
