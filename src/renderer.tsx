import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element #root not found");
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <MemoryRouter initialEntries={["/history"]}>
      <App />
    </MemoryRouter>
  </React.StrictMode>,
);
