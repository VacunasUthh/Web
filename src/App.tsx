import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './componentes/MainLayout';
import ParentsTable from './componentes/pacients/pacientSelection';
import ParentsList from './componentes/pacients/pacientList';
import CalendarList from './componentes/calendar/calendarList';
import FAQ from './componentes/FAQ';
import Login from './componentes/login/Login';
import TabRegister from './componentes/login/TabRegister';
import { AuthProvider } from './componentes/AuthContext';
import PrivateRoute from './componentes/PrivateRoute'; // Ajusta la ruta según corresponda
import EditProfile from './componentes/user/EditProfile';
import Recovery from './componentes/recovery/recoveryPass';
import Code from './componentes/recovery/entercode';
import ChangePas from './componentes/recovery/changePass';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<TabRegister />} />
          <Route path="/recovery" element={<Recovery />} />
        <Route path="/code" element={<Code />} />
        <Route path="/change" element={<ChangePas />} />
          <Route path="/*" element={<PrivateRoute element={<MainLayout />} path="/*" />}>
            <Route path="main" element={<div>Inicio</div>} />
            <Route path="parentsTable" element={<ParentsTable />} />
            <Route path="parentsList" element={<ParentsList />} />
            <Route path="calendarList" element={<CalendarList />} />
            <Route path="editProfile" element={<EditProfile />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="" element={<Navigate to="main" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
