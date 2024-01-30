const express = require("express");
const router = express.Router();
const db = require("../Connection/connection");

// Get Product from products table
router.get("/getProductName", (err, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Add product details into product_details table
router.post("/addProductDetails", (req, res) => {
  const { date, quantity, product_id } = req.body;
  const totalAvailable = available + quantity;

  const sql =
    "INSERT INTO product_details (`DATE`, `Available`, ` Quantity`, `Product_ID`) VALUES (?, ?, ?, ?)";
  db.query(sql, [date, totalAvailable, quantity, product_id], (err, result) => {
    if (err) {
      console.error("Database query error: " + err.message);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: "Product  details added successfully", result });
    }
  });
});

module.exports = router;
