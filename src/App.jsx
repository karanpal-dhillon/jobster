import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Landing, Error, Register, ProtectedRoute } from "./pages";
import {
  AllJobs,
  SharedLayout,
  Stats,
  Profile,
  AddJob,
} from "./pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: (
      <ProtectedRoute>
        <SharedLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Stats />,
      },
      {
        path: "all-jobs",
        element: <AllJobs />,
      },
      {
        path: "add-job",
        element: <AddJob />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "landing",
    element: <Landing />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
