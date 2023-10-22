import React from "react";
import ReactDOM from "react-dom/client";
import App from "./views/App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
  </Router>
);
