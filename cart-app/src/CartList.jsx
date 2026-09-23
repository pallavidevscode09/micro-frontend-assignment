import React, { useEffect, useState } from "react";
import "./CartList.css";

function CartList() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const loadCart = () => {
      const storedCart =
        JSON.parse(localStorage.getItem("cart")) || [];

      setCart(storedCart);
    };

    loadCart();

    // Listen for cart updates from other microfrontends
    window.addEventListener("cart-updated", loadCart);

    return () => {
      window.removeEventListener(
        "cart-updated",
        loadCart
      );
    };
  }, []);

  // Update localStorage
  const updateCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new CustomEvent("cart-updated")
    );
  };

  // Increase quantity
  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: (product.quantity || 1) + 1,
        };
      }

      return product;
    });

    updateCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((product) => {
        if (product.id === productId) {
          const newQuantity =
            (product.quantity || 1) - 1;

          return {
            ...product,
            quantity: newQuantity,
          };
        }

        return product;
      })
      .filter((product) => product.quantity > 0);

    updateCart(updatedCart);
  };

  // Remove product
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(
      (product) => product.id !== productId
    );

    updateCart(updatedCart);
  };

  // Calculate totals
  const subtotal = cart.reduce(
    (total, product) =>
      total +
      product.price * (product.quantity || 1),
    0
  );

  const mrpTotal = cart.reduce(
    (total, product) =>
      total +
      product.mrp * (product.quantity || 1),
    0
  );

  const discount = mrpTotal - subtotal;

  const deliveryCharge =
    subtotal >= 500 ? 0 : 40;

  const total = subtotal + deliveryCharge;

  return (
    <div className="cart-page">

      <div className="cart-container">

        {/* PAGE HEADER */}

        <div className="cart-header">
          <h1>Shopping Cart</h1>

          <span>
            {cart.length}{" "}
            {cart.length === 1
              ? "Item"
              : "Items"}
          </span>
        </div>

        {/* EMPTY CART */}

        {cart.length === 0 ? (
          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>Your cart is empty</h2>

            <p>
              Add products to your cart and
              they will appear here.
            </p>

          </div>
        ) : (

          /* CART CONTENT */

          <div className="cart-layout">

            {/* LEFT SIDE */}

            <div className="cart-products">

              {cart.map((product) => {

                const quantity =
                  product.quantity || 1;

                const itemTotal =
                  product.price * quantity;

                return (
                  <div
                    className="cart-card"
                    key={product.id}
                  >

                    {/* PRODUCT IMAGE */}

                    <div className="cart-image-container">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="cart-image"
                      />

                    </div>

                    {/* PRODUCT INFORMATION */}

                    <div className="cart-details">

                      <h2>
                        {product.name}
                      </h2>

                      <p className="cart-description">
                        {product.description}
                      </p>

                      {/* RATING */}

                      <div className="cart-rating-row">

                        <span className="cart-rating">
                          {product.rating} ★
                        </span>

                        <span className="cart-reviews">
                          {product.reviews?.toLocaleString(
                            "en-IN"
                          )}{" "}
                          Ratings
                        </span>

                      </div>

                      {/* PRICE */}

                      <div className="cart-price-row">

                        <span className="cart-price">
                          ₹
                          {product.price.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        <span className="cart-mrp">
                          ₹
                          {product.mrp.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        <span className="cart-discount">
                          {product.discount}% off
                        </span>

                      </div>

                      {/* DELIVERY */}

                      <p className="cart-delivery">
                        🚚 {product.delivery}
                      </p>

                      {/* ACTIONS */}

                      <div className="cart-actions">

                        {/* QUANTITY */}

                        <div className="quantity-control">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                product.id
                              )
                            }
                          >
                            −
                          </button>

                          <span>
                            {quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                product.id
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                        {/* REMOVE */}

                        <button
                          className="remove-btn"
                          onClick={() =>
                            removeFromCart(
                              product.id
                            )
                          }
                        >
                          Remove
                        </button>

                        {/* SAVE */}

                        <button className="save-btn">
                          Save for later
                        </button>

                      </div>

                    </div>

                    {/* ITEM TOTAL */}

                    <div className="item-total">

                      <span>
                        Item Total
                      </span>

                      <strong>
                        ₹
                        {itemTotal.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* RIGHT SIDE PRICE DETAILS */}

            <div className="price-details">

              <h2>
                PRICE DETAILS
              </h2>

              <div className="price-line">

                <span>
                  Price (
                  {cart.length}{" "}
                  {cart.length === 1
                    ? "item"
                    : "items"}
                  )
                </span>

                <span>
                  ₹
                  {mrpTotal.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              <div className="price-line">

                <span>
                  Discount
                </span>

                <span className="discount-text">
                  − ₹
                  {discount.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              <div className="price-line">

                <span>
                  Delivery Charges
                </span>

                <span>
                  {deliveryCharge === 0
                    ? "FREE"
                    : `₹${deliveryCharge}`}
                </span>

              </div>

              <div className="price-divider"></div>

              <div className="total-line">

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹
                  {total.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div className="savings-message">
                You will save ₹
                {discount.toLocaleString(
                  "en-IN"
                )}{" "}
                on this order
              </div>

              <button className="place-order-btn">
                Place Order
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default CartList;