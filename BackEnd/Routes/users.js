const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../Connection/connection");

// signup Controller

router.post("/signUp", (req, res) => {
  const sql =
    "INSERT INTO signup(`Name`, `Email`, `Role`, `Password`) VALUES (?, ?, ?, ?)";

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error hashing password" });
    }

    const values = [req.body.name, req.body.email, req.body.role, hash];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ message: "Error inserting user" });
      } else {
        console.log("User registered successfully");
        res.json(result);
      }
    });
  });
});

// Login Controller
router.post("/login", (req, res) => {
  // Retrieve user from the database based on the provided email
  const sql = "SELECT * FROM signup WHERE `Email` = ? ";

  db.query(sql, [req.body.email], (err, data) => {
    console.log(data);
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ message: "Error fetching user" });
    }

    if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].Password, (err, resp) => {
        if (err) {
          return res.json({ login: false, message: "Password not matched" });
        }
        if (resp) {
          const id = data.id;
          const token = jwt.sign({ id }, "jwtSecretKey", { expiresIn: 300 });
          return res?.json({ login: true, token, result: data });
        }
        return res.json({ login: false, message: "Password not śmatched" });
      });
    } else {
      return res?.json({ login: false, message: "Password not matched" });
    }
  });
});

module.exports = router;
