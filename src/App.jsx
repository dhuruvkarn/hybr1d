import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Product from "./components/Product";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/product/:id" element={<Product />}></Route>
    </Routes>
  );
}

export default App;
