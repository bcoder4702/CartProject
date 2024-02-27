import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import orderP from "./pages/orderP";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProductList />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/placed" element={<orderP/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
