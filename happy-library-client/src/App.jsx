import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage/HomePage';
import JoinPage from './pages/JoinPage/JoinPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MyPage from './pages/MyPage/MyPage';
import './App.css';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Layout>
        <nav>
          {isLoggedIn ? (
            <Link to='/mypage'>마이페이지</Link>
          ) : (
            <Link to='/login'>로그인</Link>
          )}
        </nav>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/join' element={<JoinPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/mypage' element={<MyPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;