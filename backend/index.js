const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./db/db");
const app = express();
const routes = require("./routes/eventRoutes");
const fs = require("fs");
const path = require("path");
const Users = require('./model/userModel');
app.use(cors());
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error(err); // Log error details
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Errr",
  });
  next();
});
app.use("/event", routes);
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
app.get("/event/getbyid/:id", (req, res) => {
    const file = Users.find((f) => f.id === req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
  
    const filepath = path.join(__dirname, file.filepath);
    res.download(filepath, file.filename, (err) => {
      if (err) {
        console.error("File download error:", err);
        res.status(500).json({ message: "Error downloading file" });
      }
    });
  });
