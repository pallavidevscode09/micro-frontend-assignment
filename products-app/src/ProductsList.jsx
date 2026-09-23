import React from "react";
import "./ProductsList.css";

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 75000,
  },
  {
    id: 2,
    name: "Mobile Phone",
    price: 35000,
  },
  {
    id: 3,
    name: "Headphones",
    price: 5000,
  },
  {
    id: 4,
    name: "Keyboard",
    price: 2500,
  },
];

function ProductsList() {
  const addToCart = (product) => {
    // Get existing cart
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    // Add product
    const updatedCart = [
      ...existingCart,
      product,
    ];

    // Save cart
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    // Notify other microfrontends
    window.dispatchEvent(
      new CustomEvent("cart-updated")
    );

    alert(`${product.name} added to cart`);
  };

  return (
    <div className="products-container">
      <h1>Products</h1>

      <div className="products-grid">

        {products.map((product) => (
          <div
            className="product-card"
            key={product.id}
          >
            <h2>{product.name}</h2>

            <p>
              ₹{product.price.toLocaleString()}
            </p>

            <button
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default ProductsList;