// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/Login';
import Welcome from './componentes/Welcome';
import Campaña from './componentes/campaña';
import Appointments from './componentes/citas';
import MyCalendar from './componentes/calendario';
import MainLayout from './componentes/MainLayout';
import ParentsTable from './componentes/pacients/pacientSelection';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="campaign" element={<Campaña />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="calendar" element={<MyCalendar />} />
          <Route path="parentsTable" element={<ParentsTable />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
