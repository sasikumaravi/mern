import React, { useState, useRef } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Validate file type
    const allowedFormats = ["image/jpeg", "image/png", "application/pdf", 
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
    if (selectedFile && !allowedFormats.includes(selectedFile.type)) {
      setErrorMessage("Invalid file format. Please upload a valid file.");
      fileInputRef.current.value = null; // Reset the input
      setFile(null);
      return;
    }
    setErrorMessage("");
    setFile(selectedFile);
  };

  const handlePost = async () => {
    if (!file) {
      setErrorMessage("Please select a valid file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    try {
      const result = await axios.post(
        "http://localhost:5000/event/postfile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);
      alert("File uploaded successfully!");
      setFile(null);
      fileInputRef.current.value = null; // Reset the input field
    } catch (err) {
      console.log("Upload error:", err);
      setErrorMessage("Failed to upload the file. Please try again.");
    }
  };

  return (
    <>
      <div className="input-group mb-3">
        <input
          type="file"
          name="file"
          accept="image/*,.pdf,.xlsx"
          onChange={handleFileChange}
          className="form-control"
          id="inputGroupFile02"
          ref={fileInputRef} // Attach the ref to the input
        />
        <button onClick={handlePost} className="btn btn-primary">
          Upload
        </button>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  );
}
