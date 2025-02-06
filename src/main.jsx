import "./index.css";

// React imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// App
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
