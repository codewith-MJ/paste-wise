// src/renderer.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // @import "tailwindcss"; 가 들어있는 파일

function App() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">💖 Hello World!</h1>
        <p>Welcome to your Electron application.</p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
