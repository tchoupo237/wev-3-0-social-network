import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Inscription from "./pages/inscription/Inscription";
import Connexion from "./pages/connexion.jsx/Connexion";
import Dashboard from "./pages/dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/inscription",
    element: <Inscription />,
  },
  {
    path: "/connexion",
    element: <Connexion />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />,
  </QueryClientProvider>,
);
