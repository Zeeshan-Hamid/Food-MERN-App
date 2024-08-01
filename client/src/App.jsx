import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Layout from "./pages/Layout/Layout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/food/:id",
          element: <DetailPage />,
        },
        {
          path:"/login", element:<LoginPage />
        }, {
          path:"/signup", element:<SignupPage />
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
