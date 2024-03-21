import React from 'react'; 
import Home from './component/home';
import {Routes ,Route} from 'react-router-dom'
import Update from './component/update';


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/update/:id" element={<Update />}></Route>
    </Routes>
    </>
  );
}

export default App;
