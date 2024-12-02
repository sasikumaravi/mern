import axios from 'axios';
import React, { useState } from 'react';
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import html2canvas from "html2canvas";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    location: "",
    date: "",
  });

  const updateFormData = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const htmltoImage = () => {
    const domElement = document.getElementsByClassName("comments-result");
    const arr = [...domElement];
    const generateImage = async (domElement) => {
      const canvas = await html2canvas(domElement, {
        onclone: (document_1) => {
          document_1.getElementById("innerDiv").style.display = "block";
        },
        windowWidth: 1600,
      });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      return imgData;
    };
    return Promise.all(arr.map((element) => generateImage(element)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/event/postuser', {
      name: formData.name,
      title: formData.title,
      age: e.target[2].value,
      location: formData.location,
      start: formData.date,
      end: formData.date,
    });
    console.log('resp', response.data);

    // Reset form fields
    setFormData({
      name: "",
      title: "",
      location: "",
      date: "",
    });
    e.target.reset(); // Reset the form element
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          onChange={updateFormData}
          value={formData.name}
          id="exampleFormControlInput1"
          placeholder="Enter your name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput5">Event Name</label>
        <input
          type="text"
          name="title"
          className="form-control"
          onChange={updateFormData}
          value={formData.title}
          id="exampleFormControlInput5"
          placeholder="Enter event name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput2">Age</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput2"
          placeholder="Enter your age"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Location</label>
        <select
          className="form-control"
          onChange={updateFormData}
          name="location"
          value={formData.location}
          id="exampleFormControlSelect1"
        >
          <option value="">Select Location</option>
          <option>Thudiyalur</option>
          <option>Mettupalayam</option>
          <option>Saravanampatti</option>
          <option>Kalapatti</option>
          <option>Gandhipuram</option>
          <option>Ooty</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput3">Date</label>
        <input
          type="date"
          name="date"
          onChange={updateFormData}
          className="form-control"
          value={formData.date}
          id="exampleFormControlInput3"
          placeholder="Enter date"
        />
      </div>
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => {
          htmltoImage().then(() => {
            import("./pdfGenerator")
              .then(async (module) => {
                const PdfFile = module.default;
                const doc = <PdfFile title="Personal Doc" data={formData} />;
                const blob = await pdf(doc).toBlob();
                saveAs(blob, "pdfdoc.pdf");
              })
              .catch((error) => console.log("error====>", error));
          });
        }}
      >
        Submit form
      </button>
    </form>
  );
}
