import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [images, setImages] = useState(null);

  const [values, setValues] = useState({
    productName: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "productImg" && files.length > 0) {
      const file = files[0];
      setImages(file);
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("Sending data", values, images);
      const formData = new FormData();
      formData.append("productName", values.productName);

      formData.append("productImg", images);

      const res = await axios.post(
        "http://localhost:8080/addProduct",
        formData
      );

      if (
        res.data.message === "New product added successfully" ||
        res.data.message === "Product image updated successfully"
      ) {
        console.log("Product is Successfully submitted");
        alert("Product stored successfully");
        navigate("/");
      } else {
        console.log("Product Submission failed");
      }
    } catch (err) {
      console.log(err);
      alert("Please check your form");
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById("image-upload-input");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-400 h-screen">
      <div className="p-3 bg-white w-[28rem] rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="text-center">
          <div className="mb-3 flex flex-row gap-3 items-center">
            <label htmlFor="productName">Name</label>
            <input
              type="text"
              name="productName"
              placeholder="Enter your Produt Name"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="box-decoration">
            <label htmlFor="image-upload-input" className="image-upload-label">
              {images ? images.name : "Choose an image"}
            </label>
            <div onClick={handleClick} style={{ cursor: "pointer" }}>
              {images ? (
                <img
                  src={URL.createObjectURL(images)}
                  alt="upload"
                  className="img-display-after"
                />
              ) : (
                <img
                  src="./../upload.png"
                  alt="upload"
                  className="img-display-before"
                />
              )}

              <input
                id="image-upload-input"
                type="file"
                name="productImg"
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-success bg-slate-400 text-black"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
