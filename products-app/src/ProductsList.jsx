import React from "react";
import "./ProductsList.css";

const products = [
  {
    id: 1,
    name: "Apple MacBook Air M3 Laptop",
    description: "13-inch Liquid Retina Display, 8GB RAM, 256GB SSD",
    price: 75000,
    mrp: 89900,
    discount: 17,
    rating: 4.6,
    reviews: 1248,
    delivery: "FREE Delivery Tomorrow",
    offer: "Bank Offer",
    image: "/images/laptop.jpg",
  },

  {
    id: 2,
    name: "Samsung Galaxy S24 5G",
    description: "8GB RAM, 256GB Storage, Dynamic AMOLED Display",
    price: 35000,
    mrp: 49999,
    discount: 30,
    rating: 4.5,
    reviews: 2387,
    delivery: "FREE Delivery Tomorrow",
    offer: "10% Instant Discount",
    image: "/images/mobile.jpg",
  },

  {
    id: 3,
    name: "Sony WH-1000XM5 Wireless Headphones",
    description: "Wireless Noise Cancelling Headphones with 30-hour battery",
    price: 24990,
    mrp: 34990,
    discount: 29,
    rating: 4.7,
    reviews: 1892,
    delivery: "FREE Delivery in 2 Days",
    offer: "Special Price",
    image: "/images/headphones.jpg",
  },

  {
    id: 4,
    name: "Logitech MX Mechanical Keyboard",
    description: "Wireless Mechanical Keyboard with Backlit Keys",
    price: 8995,
    mrp: 12995,
    discount: 31,
    rating: 4.5,
    reviews: 654,
    delivery: "FREE Delivery Tomorrow",
    offer: "Limited Time Deal",
    image: "/images/keyboard.jpg",
  },

  {
    id: 5,
    name: "Apple iPhone 16",
    description: "128GB, Super Retina XDR Display, A18 Chip",
    price: 69999,
    mrp: 79900,
    discount: 12,
    rating: 4.6,
    reviews: 3567,
    delivery: "FREE Delivery Tomorrow",
    offer: "Exchange Offer Available",
    image: "/images/iphone.jpg",
  },

  {
    id: 6,
    name: "Dell 27-inch 4K Monitor",
    description: "Ultra HD IPS Display, 60Hz, HDMI and DisplayPort",
    price: 28999,
    mrp: 39999,
    discount: 28,
    rating: 4.4,
    reviews: 876,
    delivery: "FREE Delivery in 2 Days",
    offer: "Bank Offer",
    image: "/images/monitor.jpg",
  },

  {
    id: 7,
    name: "Apple AirPods Pro 2nd Generation",
    description: "Active Noise Cancellation, USB-C Charging Case",
    price: 19999,
    mrp: 24900,
    discount: 20,
    rating: 4.7,
    reviews: 4289,
    delivery: "FREE Delivery Tomorrow",
    offer: "Extra ₹1,000 Off",
    image: "/images/airpods.jpg",
  },

  {
    id: 8,
    name: "Samsung 55-inch 4K Smart TV",
    description: "Crystal UHD 4K Smart TV with HDR and Dolby Audio",
    price: 42999,
    mrp: 59999,
    discount: 28,
    rating: 4.5,
    reviews: 2145,
    delivery: "FREE Delivery in 3 Days",
    offer: "No Cost EMI Available",
    image: "/images/tv.jpg",
  },

  {
    id: 9,
    name: "Nike Air Max Running Shoes",
    description: "Men's Lightweight Running Shoes with Air Cushion",
    price: 6999,
    mrp: 9999,
    discount: 30,
    rating: 4.4,
    reviews: 1532,
    delivery: "FREE Delivery Tomorrow",
    offer: "Buy 2 Get Extra Discount",
    image: "/images/shoes.jpg",
  },

  {
    id: 10,
    name: "Fossil Men's Chronograph Watch",
    description: "Stainless Steel Analog Chronograph Watch",
    price: 8995,
    mrp: 14995,
    discount: 40,
    rating: 4.3,
    reviews: 987,
    delivery: "FREE Delivery Tomorrow",
    offer: "Deal of the Day",
    image: "/images/watch.jpg",
  },

  {
    id: 11,
    name: "Sony PlayStation 5 Slim",
    description: "PlayStation 5 Slim Console with Ultra HD Blu-ray",
    price: 54990,
    mrp: 59990,
    discount: 8,
    rating: 4.8,
    reviews: 5241,
    delivery: "FREE Delivery in 2 Days",
    offer: "No Cost EMI",
    image: "/images/ps5.jpg",
  },

  {
    id: 12,
    name: "Amazon Echo Dot Smart Speaker",
    description: "Smart speaker with Alexa and improved audio",
    price: 4499,
    mrp: 5499,
    discount: 18,
    rating: 4.4,
    reviews: 6842,
    delivery: "FREE Delivery Tomorrow",
    offer: "Special Deal",
    image: "/images/echo.jpg",
  },
];

function ProductsList() {
  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = existingCart.findIndex(
      (item) => item.id === product.id,
    );

    let updatedCart;

    if (existingProductIndex !== -1) {
      updatedCart = [...existingCart];

      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        quantity: (updatedCart[existingProductIndex].quantity || 1) + 1,
      };
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new CustomEvent("cart-updated"));

    alert(`${product.name} added to cart`);
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <div>
          <h1>Products</h1>
          <p>Explore our latest products</p>
        </div>

        <div className="product-count">{products.length} Products</div>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            {/* IMAGE */}
            <div className="product-image-container">
              <span className="discount-badge">{product.discount}% OFF</span>

              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </div>

            {/* PRODUCT DETAILS */}
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>

              <p className="product-description">{product.description}</p>

              {/* RATING */}
              <div className="rating-row">
                <span className="rating">{product.rating} ★</span>

                <span className="reviews">
                  {product.reviews.toLocaleString()} Ratings
                </span>
              </div>

              {/* PRICE */}
              <div className="price-row">
                <span className="product-price">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>

                <span className="product-mrp">
                  ₹{product.mrp.toLocaleString("en-IN")}
                </span>

                <span className="discount">{product.discount}% off</span>
              </div>

              {/* OFFER */}
              <div className="offer">
                <span>🏷️</span>
                <strong>{product.offer}</strong>
              </div>

              {/* DELIVERY */}
              <p className="delivery">🚚 {product.delivery}</p>

              {/* STOCK */}
              <p className="stock">✓ In Stock</p>

              {/* BUTTONS */}
              <div className="product-actions">
                <button
                  className="add-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

                <button className="buy-now-btn">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
