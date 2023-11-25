import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Layout from "./components/Layout.tsx";
import AppRoutes from "./components/AppRoutes.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
