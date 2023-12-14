import { useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage/HomePage";
import JoinPage from "./pages/JoinPage/JoinPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MyInfoPage from "./pages/MyInfoPage/MyInfoPage";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";

import "./App.css";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Layout>
        <nav>
          {isLoggedIn ? (
            <Link to="/my-info">내 정보</Link>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my-info" element={<MyInfoPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;