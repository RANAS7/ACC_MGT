const express = require("express");
const router = express.Router();
const db = require("../Connection/connection");

//  get all user datas for Salary Controller
router.get("/users", (req, res) => {
  db.query("SELECT * FROM signup", (err, results) => {
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

// Insert salary data into salary table
router.post("/add-salary", (req, res) => {
  const sql = "INSERT INTO salary(`Amount`, `Date`, User_ID) VALUES(?,?,?)";
  db.query(
    sql,
    [req.body.amount, req.body.date, req.body.selectedUser],
    (err, result) => {
      if (err) {
        console.error("Error inserting salary", err);
        return res.status(500).json({ message: "Error inserting salary" });
      } else {
        console.log("Salary registered successfully");
        res.json(result);
      }
    }
  );
});

// Get salary details
router.get("/getSalary", (req, res) => {
  db.query(
    "SELECT signup.name, salary.* FROM signup JOIN salary ON signup.id = salary.User_ID",
    (err, results) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      } else {
        res.status(200).json({ success: true, data: results });
      }
    }
  );
});

module.exports = router;
