import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";





export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<Home />} />)
  );

  return <RouterProvider router={router} />;
}
