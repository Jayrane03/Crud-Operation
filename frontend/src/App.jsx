import React from 'react';
import RegisterForm from './Pages/register.jsx';
import LoginForm from './Pages/login.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/home';
import Home2 from './component/home2.jsx';
import Update from './component/update.jsx'
const App = () => {
  return (
    <div>
     
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<RegisterForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home2" element={<Home2 />}></Route>
         <Route path="/update/:id" element={<Update />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
