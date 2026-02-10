import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import VideoPage from "./pages/VideoPage";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* App */}
        <Route
          path="/"
          element={
            <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
              <Home searchTerm={searchTerm} />
            </Layout>
          }
        />
        <Route
          path="/video/:id"
          element={
            <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
              <VideoPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
