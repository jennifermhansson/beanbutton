import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; // ✅ vi importerar App istället för Timer direkt

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
