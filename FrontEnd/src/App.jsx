import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Forms/Signup";
import Login from "./Forms/Login";
import Home from "./Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
