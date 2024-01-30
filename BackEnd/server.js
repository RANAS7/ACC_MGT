const express = require("express");
const cors = require("cors");
require("./Connection/connection");
const bodyParser = require("body-parser");
const users = require("./Routes/users");
const salary = require("./Routes/salary");
const product = require("./Routes/product");
const productDetails = require("./Routes/product_details");
const sales = require("./Routes/sales");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(users);
app.use(salary);
app.use(product);
app.use(productDetails);
app.use(sales);

app.listen(8080, () => {
  console.log(`Backend is running on port 8080`);
});
