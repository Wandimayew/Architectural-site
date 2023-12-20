const express = require("express");
const multer = require("multer");
// import multer from 'multer';
const fs = require("fs");
// import fs from 'fs'
const path = require("path");
// import path from 'path';

const designRoute=express.Router();

const uploadFolderPath = path.join(__dirname, "../uploads");
console.log(uploadFolderPath);
// Check if the upload folder exists, create it if it doesn't
if (!fs.existsSync(uploadFolderPath)) {
  fs.mkdirSync(uploadFolderPath);
}

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "file") {
      // Check the file extensions for the image file png, .jpg, .jpeg
      if (file.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/)) {
        cb(null, true);
      } else {
        cb(
          new Error(
            "Invalid file type. Only PNG, JPG, and JPEG files are allowed."
          )
        );
      }
    } else {
      // Ignore any other files
      cb(null, false);
    }
  };

  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadFolderPath);
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    }),
    fileFilter: fileFilter,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB size limit
    },
  });

  import("../Controller/Design.js").then(({ addDesign }) => {
    // Handle upload
    designRoute
      .route("/addDesigns")
      .post(upload.fields([{ name: "file", maxCount: 1 }]), addDesign);
  });

import("../Controller/Design.js").then(({ getDesign }) => {
  designRoute.route("/getDesigns").get(getDesign);
});
import("../Controller/Design.js").then(({editDesign})=>{
  designRoute.route("/editDesigns/:itemID").put(editDesign);
})
import("../Controller/Design.js").then(({deleteDesign})=>{
  designRoute.route("/deleteDesigns/:id").delete(deleteDesign);
})

// export default bookRoute;
module.exports = designRoute;