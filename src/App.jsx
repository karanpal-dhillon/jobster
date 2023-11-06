import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Landing, Error } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
