import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./root/router";
import { BackgroundProvider } from "./components/context/BackgroundContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BackgroundProvider>
      <RouterProvider router={router}></RouterProvider>
    </BackgroundProvider>
  </StrictMode>
);
