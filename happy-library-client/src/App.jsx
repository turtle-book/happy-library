import React from 'react';
import { Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/pages/Layout/Layout';
import Home from './components/pages/Home/Home';
import LoginPage from './components/pages/LoginPage/LoginPage';
import MyPage from './components/pages/MyPage/MyPage';
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
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/mypage' element={<MyPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;