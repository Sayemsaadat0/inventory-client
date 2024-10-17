import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./root/router";
// import { BackgroundProvider } from "./components/context/BackgroundContext";
import { BackgroundProvider1 } from "./components/context/Background1Context";
import { UserProvider } from "./components/context/UserProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BackgroundProvider1>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
        </UserProvider>
      </QueryClientProvider>
    </BackgroundProvider1>
  </StrictMode>
);
