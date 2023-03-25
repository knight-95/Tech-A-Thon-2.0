import React, { useState, useEffect } from 'react';
import { Route, Link, Routes, Router } from 'react-router-dom';
import Home from './Home';
import Firm from './Firm';
import NewHome from './NewHome';

export default function App() {
  return (
      <Routes>
        <Route path={'/'} exact element={<NewHome />} />
        <Route path={'/main'} exact element={<Home />} />
        <Route path={'/firm'} exact element={<Firm />} />
      </Routes>
  )
}
