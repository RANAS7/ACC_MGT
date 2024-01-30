const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const db = require("../Connection/connection");

// For Insert a Image file into database

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Add products into products table
router.post("/addProduct", upload.single("productImg"), (req, res) => {
  // Check if file upload was successful
  if (!req.file) {
    return res.status(400).json({ message: "File upload failed" });
  }

  const productName = req.body.productName; // Assuming productName is a field in the request body
  const images = req.file.filename;

  // Check if the product already exists
  db.query(
    "SELECT `Image` FROM products WHERE `Product_Name` = ?",
    [productName],
    (err, result) => {
      if (err) {
        console.error("Database query error: " + err.message);
        res.status(500).json({ message: "Internal server error" });
      } else {
        const oldImage = result[0] && result[0].Image;

        if (oldImage) {
          // Product exists, update the image
          const sqlUpdateQuery =
            "UPDATE products SET `Image` = ? WHERE `Product_Name` = ?";
          db.query(
            sqlUpdateQuery,
            [images, productName],
            (err, updateResult) => {
              if (err) {
                console.error("Database update error: " + err.message);
                res.status(500).json({ message: "Internal server error" });
              } else {
                // Delete the old image after successfully updating
                fs.unlink(path.join("Public/Images", oldImage), (err) => {
                  if (err) {
                    console.error("Error deleting old image: " + err.message);
                  }
                });

                res.json({
                  message: "Product image updated successfully",
                  result: updateResult,
                });
              }
            }
          );
        } else {
          // Product doesn't exist, insert a new record
          const sqlInsertQuery =
            "INSERT INTO products (`Product_Name`, `Image`) VALUES (?, ?)";
          db.query(
            sqlInsertQuery,
            [productName, images],
            (err, insertResult) => {
              if (err) {
                console.error("Database insert error: " + err.message);
                res.status(500).json({ message: "Internal server error" });
              } else {
                res.json({
                  message: "New product added successfully",
                  result: insertResult,
                });
              }
            }
          );
        }
      }
    }
  );
});

module.exports = router;
