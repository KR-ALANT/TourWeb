import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './main/MainPage';
import Local from './local//Local';
import Calendar from './calendar/Calendar';
import Map from './map/Map';

function App() {
  return (
    <Routes>
      <Route path = "/" element = {<MainPage />} />
      <Route path = "/local/Local" element = {<Local />} />
      <Route path = "/calendar/Calendar" element = {<Calendar />} />
      <Route path = "/map/Map" element = {<Map />} />
    </Routes>
  );
}

export default App;