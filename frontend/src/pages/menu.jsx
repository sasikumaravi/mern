import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { Table, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { EmailShareButton } from "react-share";
import "../App.css";

export default function Menu() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredData(
      data.filter((item) => item.filename.toLowerCase().includes(term))
    );
  };

  const handleDownload = async (id, fileurl) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/event/getbyid/${id}`,
        { responseType: "blob" } // Handle binary data
      );

      // Extract filename from response headers or set a default
      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1]?.replace(/"/g, "")
        : "downloaded_file";

      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handlePageClick = (selected) => {
    setCurrentPage(selected.selected);
  };

  const displayedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/event/getall");
      setData(response.data);
      setFilteredData(response.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Nav fill variant="tabs" defaultActiveKey="/menu/upload">
        <Nav.Item>
          <Nav.Link as={Link} to="upload">
            Upload
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="form">
            Generate
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="visual">
            Visualize
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Outlet />
      <Form.Control
        type="text"
        placeholder="Search files..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-3"
      />
      <Table responsive="md" striped bordered hover>
        <thead>
          <tr>
            <th>Sl.no</th>
            <th>File Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item, index) => (
            <tr key={item.id}>
              <td>{currentPage * itemsPerPage + index + 1}</td>
              <td>{item.filename}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleDownload(item._id, item.fileurl)}
                >
                  Download
                </Button>
                <EmailShareButton title="test title">Share</EmailShareButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ReactPaginate
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={Math.ceil(filteredData.length / itemsPerPage)}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
}
