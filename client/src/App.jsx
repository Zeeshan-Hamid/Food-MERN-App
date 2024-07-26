import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/food/:id" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
