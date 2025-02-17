import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/index.tsx";
import ProtectedRoute from "./components/ProtectedRoute/index.tsx";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<App />} />
          </Route>
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  </StrictMode>
);
