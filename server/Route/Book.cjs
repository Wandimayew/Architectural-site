// import express from 'express'
const express = require("express");
const multer = require("multer");
// import multer from 'multer';
const fs = require("fs");
// import fs from 'fs'
const path = require("path");
// import path from 'path';


// import { addBook, getBook } from '../Controller/Book.js';
const bookRoute=express.Router();

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

  import("../Controller/Book.js").then(({ addBook }) => {
    // Handle upload
    bookRoute
      .route("/addBooks")
      .post(upload.fields([{ name: "file", maxCount: 1 }]), addBook);
  });
import("../Controller/Book.js").then(({ getBook }) => {
  bookRoute.route("/getBooks").get(getBook);
});
import("../Controller/Book.js").then(({editBook})=>{
  bookRoute.route("/editBook/:itemID").put(editBook);
})
import("../Controller/Book.js").then(({deleteBook})=>{
  bookRoute.route("/deleteBook/:id").delete(deleteBook);
})

module.exports = bookRoute;