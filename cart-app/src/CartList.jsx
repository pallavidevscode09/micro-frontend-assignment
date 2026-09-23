import React, { useEffect, useState } from "react";
import "./CartList.css";

function CartList() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  const loadCart = () => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  };

  useEffect(() => {
    // Load existing cart when Cart page opens
    loadCart();

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener(
      "cart-updated",
      handleCartUpdate
    );

    return () => {
      window.removeEventListener(
        "cart-updated",
        handleCartUpdate
      );
    };
  }, []);

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter(
      (_, index) => index !== indexToRemove
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new CustomEvent("cart-updated")
    );
  };

  return (
    <div className="cart-container">

      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>

          {cart.map((product, index) => (
            <div
              className="cart-item"
              key={`${product.id}-${index}`}
            >

              <div>
                <h2>{product.name}</h2>

                <p>
                  ₹{product.price.toLocaleString()}
                </p>
              </div>

              <button
                onClick={() =>
                  removeFromCart(index)
                }
              >
                Remove
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default CartList;