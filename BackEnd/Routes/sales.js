const express = require("express");
const router = express.Router();
const db = require("../Connection/connection");

router.post("/sales", (req, res) => {
  const { partyName, date, quantity, price, selectedProduct } = req.body;
  const totalAmount = quantity * price;

  const sql =
    " INSERT INTO sales (`Party_Name`, `Sale_Date`, `Quantity`, `Price`, `Total_Amount`, `Product_ID`) VALUES(?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [partyName, date, quantity, price, totalAmount, selectedProduct],
    (err, result) => {
      if (err) {
        console.error("Error inserting sales details", err);
        return res.status(500).json({ message: "Internal server error" });
      } else {
        console.log("Sales registered successfully");
        res.json(result);
      }
    }
  );
});

module.exports = router;
