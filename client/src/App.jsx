import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route index element={<HomePage />} />)
  );

  return <RouterProvider router={router} />;
};

export default App;
