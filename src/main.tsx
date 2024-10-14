import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./root/router";
// import { BackgroundProvider } from "./components/context/BackgroundContext";
import { BackgroundProvider1 } from "./components/context/Background1Context";
import { UserProvider } from "./components/context/UserProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BackgroundProvider1>
      <UserProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserProvider>
    </BackgroundProvider1>
  </StrictMode>
);
