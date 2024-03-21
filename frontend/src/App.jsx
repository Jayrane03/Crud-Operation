import React from 'react';
import RegisterForm from './Pages/register.jsx';
import LoginForm from './Pages/login.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/home';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<Home />} />
         
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
