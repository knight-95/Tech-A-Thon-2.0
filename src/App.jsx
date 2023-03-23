import React,{useState,useEffect} from 'react';
import {  Route, Link,Routes } from 'react-router-dom';
import Home from './Home';
import Firm from './Firm';

export default function App() {
return(
 <Routes>
   <Route path={'/'} exact element={<Home/>}/> 
   <Route path={'/firm'} exact element={<Firm/>} />
 </Routes>
)
}
