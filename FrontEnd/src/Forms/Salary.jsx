import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Salary = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [values, setValues] = useState({
    amount: "",
    date: "",
    selectedUser: "",
  });

  const handleChange = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation: Check if any of the required fields is empty
    if (!values.amount || !values.selectedUser) {
      alert("Please fill in all the required fields");
      return;
    }

    try {
      console.log("Sending data:", values);
      await axios.post("http://localhost:8080/add-salary", values);

      console.log("Salary Successfully Submitted");

      alert("Salary Successfully Submitted");
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
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              name="amount"
              autoComplete="off"
              placeholder="Enter amount"
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
            <label htmlFor="user">User</label>
            <select name="selectedUser" onChange={handleChange}>
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.Name}
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

export default Salary;
