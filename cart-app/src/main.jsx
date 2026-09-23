import React from "react";
import { createRoot } from "react-dom/client";
import CartList from "./CartList";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CartList />
  </React.StrictMode>
);