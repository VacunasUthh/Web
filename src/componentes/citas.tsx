import React from 'react';

const Appointments: React.FC = () => {
  return (
    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
      <h1>Citas</h1>
      <p>Bienvenido a la página de citas. Aquí puedes gestionar y visualizar todas tus citas.</p>
      <ul>
        <li>Cita 1</li>
        <li>Cita 2</li>
        <li>Cita 3</li>
      </ul>
    </div>
  );
};

export default Appointments;
