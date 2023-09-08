import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./css/index.css";
import App from "./App";
import retrieveAllBooks from "./api/retriveAllBooks";
import ErrorPage from "./components/Error";

import handleLogin from "./api/handleLogin"
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    loader:retrieveAllBooks,
    errorElement:<h1>Home page error</h1>
  },
  {
    path: "/login",
    element:<Login/>,
    action:handleLogin,
    errorElement:<ErrorPage/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);