import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Sales = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [values, setValues] = useState({
    partyName: "",
    date: "",
    quantity: "",
    price: "",
    selectedProduct: "",
  });

  const handleChange = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/getProductName")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation: Check if any of the required fields is empty
    if (
      !values.partyName ||
      !values.quantity ||
      !values.price ||
      !values.selectedProduct
    ) {
      alert("Please fill in all the required fields");
      return;
    }

    try {
      console.log("Sending data:", values);
      await axios.post("http://localhost:8080/sales", values);

      console.log("Sales Successfully Submitted");

      alert("Sales Successfully Submitted");
      navigate("/");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-400 w-screen h-screen">
      <div className="p-3 bg-white w-[28rem] rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="text-center" action="post">
          <div className="mb-3 flex flex-row gap-3 items-center">
            <label htmlFor="partyName">Party Name</label>
            <input
              type="text"
              name="partyName"
              autoComplete="off"
              placeholder="Enter party name"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 flex flex-row gap-3 items-center">
            <label htmlFor="date">Date</label>
            <input
              type="text"
              name="date"
              autoComplete="off"
              placeholder="Enter date"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 flex flex-row gap-3 items-center">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              autoComplete="off"
              placeholder="Enter price"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 flex flex-row gap-3 items-center">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              name="quantity"
              autoComplete="off"
              placeholder="Enter quantity"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 flex flex-row gap-3 items-center">
            <label htmlFor="selectedProduct">Product</label>
            <select name="selectedProduct" onChange={handleChange}>
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.Product_Name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success bg-slate-400 text-black"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sales;
