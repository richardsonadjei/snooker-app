import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignOut from './Pages/SignOut';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';


export default function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/sign-out' element={<SignOut/>} />
      </Routes>
    </BrowserRouter>
  );
}
