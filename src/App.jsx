import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard, Landing, Error, Register } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "landing",
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
