const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "sqluser",
  password: "password",
  database: "myacc",
});

db.connect((err) => {
  if (err) {
    console.error("Database not connected");
  } else {
    console.log("Databse Connected Successfully");
  }
});

module.exports = db;
