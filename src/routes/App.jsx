import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtechtedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<>
        <ProtectedRoute>
         <Home />
      </ProtectedRoute>
      </>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;