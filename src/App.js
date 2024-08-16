import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './main/MainPage';
import MyPage from './mypage/MyPage';
import Local from './local/Local';
import './App.css';
import Calendar from './calendar/Calendar';
import Map from './map/Map';
import Community from './community/Community';

function App() {
  return (
    <Routes>
      <Route path = "/" element = {<MainPage />} />
      <Route path = "/Local" element = {<Local />} />
      <Route path = "/Calendar" element = {<Calendar />} />
      <Route path = "/Map" element = {<Map />} />
      <Route path = "/Community" element = {<Community />} />
      <Route path = "/MyPage" element = {<MyPage />} />
    </Routes>
  )
}

export default App;