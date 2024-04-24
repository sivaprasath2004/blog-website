import React, { useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import "./App.css";
const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    // Send POST request to backend
    axios
      .post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Handle response from backend
        console.log("Image uploaded successfully");
      })
      .catch((error) => {
        // Handle error
        console.error("Error uploading image:", error);
      });
  };

  return (
    <main>
      {/* <div>
        <input
          type="file"
          accept="image/*" // Specify accepted file types (images in this case)
          onChange={handleImageChange}
        />
        {selectedImage && (
          <div>
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
          </div>
        )}
        <button onClick={handleUpload}>Upload Image</button>
      </div> */}
      <Blog />
    </main>
  );
};

export default App;
