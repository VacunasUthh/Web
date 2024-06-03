import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/Login';
import Welcome from './componentes/Welcome';
import Campaña from './componentes/campaña';
import Appointments from './componentes/citas';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/campaign" element={< Campaña/>} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </Router>
  );
};

export default App;
