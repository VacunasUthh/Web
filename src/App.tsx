import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './componentes/MainLayout';
import ParentsTable from './componentes/pacients/pacientSelection';
import ParentsList from './componentes/pacients/pacientList';
import CalendarList from './componentes/calendar/calendarList';
import FAQ from './componentes/FAQ';
import Login from './componentes/login/Login';
import ListHistorial from './componentes/calendar/history';
import TabRegister from './componentes/login/TabRegister';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<TabRegister />} />
        <Route path="/*" element={<MainLayout />}>
          <Route path="main" element={<div>Inicio</div>} />
          <Route path="parentsTable" element={<ParentsTable />} />
          <Route path="parentsList" element={<ParentsList />} />
          <Route path="calendarList" element={<CalendarList />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="historial" element={<ListHistorial />} />
          <Route path="" element={<Navigate to="main" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
