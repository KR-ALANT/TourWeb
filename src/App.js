import React from 'react';
<<<<<<< HEAD
import { Route, Routes } from 'react-router-dom';
import MainPage from './main/MainPage';
import MyPage from './mypage/MyPage';
import Local from './local/Local';
=======
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './main/MainPage';
import Local from './local//Local';
>>>>>>> dca6423ed7f3735c806106b1f123d084a0c0ee4d
import Calendar from './calendar/Calendar';
import Map from './map/Map';
import Community from './community/Community';

function App() {
  return (
    <Routes>
      <Route path = "/" element = {<MainPage />} />
<<<<<<< HEAD
      <Route path = "/Local" element = {<Local />} />
      <Route path = "/Calendar" element = {<Calendar />} />
      <Route path = "/Map" element = {<Map />} />
      <Route path = "/Community" element = {<Community />} />
      <Route path = "/MyPage" element = {<MyPage />} />\
      
=======
      <Route path = "/local/Local" element = {<Local />} />
      <Route path = "/calendar/Calendar" element = {<Calendar />} />
      <Route path = "/map/Map" element = {<Map />} />
      <Route path = "/community/Community" element = {<Community />} />
>>>>>>> dca6423ed7f3735c806106b1f123d084a0c0ee4d
    </Routes>
  )
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> dca6423ed7f3735c806106b1f123d084a0c0ee4d
