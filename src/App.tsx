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
import CampaignList from './componentes/campains/CampaignList';
import CreateCampaign from './componentes/campains/CreateCampaign';
import VaccinationSchedule from './componentes/pacients/cartilla';
import VaccineList from './componentes/vaccines/VaccineList';
import CreateVaccine from './componentes/vaccines/CreateVaccine';

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
            <Route path="cartilla/:childId" element={<VaccinationSchedule />} />
            <Route path="parentsList" element={<ParentsList />} />
            <Route path="calendarList" element={<CalendarList />} />
            <Route path="editProfile" element={<EditProfile />} />
            <Route path="campaings" element={<CampaignList />} />
            <Route path="vaccines" element={<VaccineList />} />
            <Route path="makeCampaings" element={<CreateCampaign />} />
            <Route path="makeVaccines" element={<CreateVaccine />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="" element={<Navigate to="main" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
