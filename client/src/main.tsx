import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Layout from "./components/Layout.tsx";
import AppRoutes from "./components/AppRoutes.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <AppRoutes />
        <ToastContainer
          position="top-center"
          bodyClassName={"text-black text-sm"}
          limit={1}
        />
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
