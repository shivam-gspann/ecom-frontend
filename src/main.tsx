import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner.tsx";
import { StoreProvider } from "./store/context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>
);
