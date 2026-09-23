import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const ProductsList = React.lazy(() => import("products/ProductsList"));

const CartList = React.lazy(() => import("cart/CartList"));

function Home() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Microfrontend Host App</h1>

      <p>Welcome to the Host Application</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="navbar-link">
          Home
        </Link>

        <Link to="/products" className="navbar-link">
          Products
        </Link>

        <Link to="/cart" className="navbar-link">
          Cart
        </Link>
      </nav>

      {/* Microfrontend Routes */}
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<ProductsList />} />

          <Route path="/cart" element={<CartList />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
