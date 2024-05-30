import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/inicio';
import Welcome from './componentes/Welcome';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login route={undefined} navigation={undefined} />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
};

export default App;
