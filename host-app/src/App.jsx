import React, { Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import "./index.css";

const ProductsList = React.lazy(() =>
  import("products/ProductsList")
);

const CartList = React.lazy(() =>
  import("cart/CartList")
);


function Home() {
  return (
    <main className="home-page">

      <div className="home-container">

        {/* HERO SECTION */}

        <section className="hero-section">

          <div className="hero-content">

            <div className="hero-badge">
              ⚡ Microfrontend E-Commerce
            </div>

            <h1>
              Everything you need,
              <span> in one place.</span>
            </h1>

            <p>
              Explore products, manage your cart,
              and experience a modern e-commerce
              application built with React
              Microfrontends.
            </p>

            <div className="hero-actions">

              <NavLink
                to="/products"
                className="primary-btn"
              >
                Explore Products →
              </NavLink>

              <NavLink
                to="/cart"
                className="secondary-btn"
              >
                View Cart
              </NavLink>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="hero-visual">

            <div className="visual-card">

              <div className="visual-top">

                <span className="visual-dot"></span>
                <span className="visual-dot"></span>
                <span className="visual-dot"></span>

              </div>

              <div className="visual-content">

                <div className="visual-icon">
                  🛍️
                </div>

                <div>
                  <strong>
                    Shopping Experience
                  </strong>

                  <p>
                    Fast • Simple • Modular
                  </p>
                </div>

              </div>


              <div className="visual-stats">

                <div>
                  <strong>12+</strong>
                  <span>Products</span>
                </div>

                <div>
                  <strong>3</strong>
                  <span>Microfrontends</span>
                </div>

                <div>
                  <strong>100%</strong>
                  <span>React</span>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* FEATURES */}

        <section className="features-section">

          <div className="section-heading">

            <span>
              PLATFORM
            </span>

            <h2>
              Built for a modern shopping experience
            </h2>

            <p>
              Each part of the application is
              independently developed as a
              microfrontend.
            </p>

          </div>


          <div className="feature-grid">

            {/* PRODUCT */}

            <div className="feature-card">

              <div className="feature-icon">
                🛒
              </div>

              <h3>
                Product Store
              </h3>

              <p>
                Browse products with pricing,
                discounts, ratings, offers and
                delivery information.
              </p>

              <NavLink
                to="/products"
                className="feature-link"
              >
                Browse Products →
              </NavLink>

            </div>


            {/* CART */}

            <div className="feature-card">

              <div className="feature-icon">
                🧺
              </div>

              <h3>
                Smart Cart
              </h3>

              <p>
                Manage quantities, remove items,
                calculate discounts and view
                complete order totals.
              </p>

              <NavLink
                to="/cart"
                className="feature-link"
              >
                Open Cart →
              </NavLink>

            </div>


            {/* ARCHITECTURE */}

            <div className="feature-card">

              <div className="feature-icon">
                ⚙️
              </div>

              <h3>
                Microfrontend Architecture
              </h3>

              <p>
                Products and Cart are independently
                loaded into the Host application
                using Module Federation.
              </p>

              <span className="feature-link">
                Host + Remotes
              </span>

            </div>

          </div>

        </section>


        {/* ARCHITECTURE */}

        <section className="architecture-section">

          <div className="architecture-header">

            <div>

              <span>
                ARCHITECTURE
              </span>

              <h2>
                Modular by design
              </h2>

            </div>

            <p>
              Independent applications working
              together as one seamless experience.
            </p>

          </div>


          <div className="architecture-flow">

            <div className="architecture-box host-box">

              <span className="architecture-label">
                HOST
              </span>

              <h3>
                Host Application
              </h3>

              <p>
                Navigation & Routing
              </p>

            </div>


            <div className="flow-arrow">
              →
            </div>


            <div className="architecture-box">

              <span className="architecture-label">
                REMOTE
              </span>

              <h3>
                Products
              </h3>

              <p>
                Product Microfrontend
              </p>

            </div>


            <div className="flow-arrow">
              →
            </div>


            <div className="architecture-box">

              <span className="architecture-label">
                REMOTE
              </span>

              <h3>
                Cart
              </h3>

              <p>
                Cart Microfrontend
              </p>

            </div>

          </div>

        </section>


        {/* FOOTER */}

        <footer className="home-footer">

          <span>
            React Microfrontend Store
          </span>

          <span>
            Built with React + Module Federation
          </span>

        </footer>

      </div>

    </main>
  );
}


function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="navbar-container">

          <NavLink
            to="/"
            end
            className="navbar-brand"
          >
            <span className="brand-icon">
              ◈
            </span>

            MicroStore
          </NavLink>


          <div className="navbar-links">

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "navbar-link active"
                  : "navbar-link"
              }
            >
              Home
            </NavLink>


            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "navbar-link active"
                  : "navbar-link"
              }
            >
              Products
            </NavLink>


            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "navbar-link active"
                  : "navbar-link"
              }
            >
              Cart
            </NavLink>

          </div>

        </div>

      </nav>


      {/* ROUTES */}

      <Suspense
        fallback={
          <div className="loading-screen">
            <div className="loading-spinner"></div>

            <p>
              Loading application...
            </p>
          </div>
        }
      >

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/products"
            element={<ProductsList />}
          />

          <Route
            path="/cart"
            element={<CartList />}
          />

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
}

export default App;