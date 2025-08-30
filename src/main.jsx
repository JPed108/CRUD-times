import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Team from "./Team.jsx";
import Chart from "./Chart.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "team/:team",
        element: <Team />,
      },
      {
        path: ":chart",
        element: <Chart />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
