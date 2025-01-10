import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SearchPage from "./routes/SearchPage.jsx";
import CategoriesPage from "./routes/CategoriesPage.jsx";
import ProdcutPage from "./routes/ProductPage.jsx";
import { HashRouter, Routes, Route } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="app" element={<App />}>
          <Route path="search" element={<SearchPage />} />
          <Route path="categories/:category" element={<CategoriesPage />} />
          <Route path="product/:id" element={<ProdcutPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
);
