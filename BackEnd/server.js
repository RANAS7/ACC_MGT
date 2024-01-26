const express = require("express");
const cors = require("cors");
require("./Connection/connection");
const bodyParser = require("body-parser");
const router = require("./Routes/route");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
