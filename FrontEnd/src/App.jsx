import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Forms/Signup";
import Login from "./Forms/Login";
import Home from "./Home";
import AddProduct from "./Forms/AddProduct";
import Salary from "./Forms/Salary";
import Sales from "./Forms/Sales";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/salary" element={<Salary />} />
          <Route path="/sales" element={<Sales />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
