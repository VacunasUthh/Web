import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, CalendarOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAuth } from './AuthContext'; // Ajusta la ruta según corresponda

const { Header, Content, Sider, Footer } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const items1: MenuProps['items'] = [
    { key: '1', label: <Link to="/main">Inicio</Link> },
    { key: '2', label: <span onClick={handleLogout}>Cerrar sesión</span> }, // Cambiado a span para manejar el evento de click
  ];

  const items2: MenuProps['items'] = [
    {
      key: 'sub1',
      icon: React.createElement(UserOutlined),
      label: 'Pacientes',
      children: [
        { key: '1', label: <Link to="/parentsTable">Seleccion pacientes</Link> },
        { key: '2', label: <Link to="/parentsList">Lista</Link> },
      ],
    },
    {
      key: 'sub2',
      icon: React.createElement(CalendarOutlined),
      label: 'Datos',
      children: [
        { key: '3', label: <Link to="/calendarList">Calendario</Link> },
        { key: '4', label: <Link to="/devices/settings">Campañas</Link> },
      ],
    },
    {
      key: 'sub3',
      icon: React.createElement(NotificationOutlined),
      label: 'Reportes',
      children: [
        { key: '5', label: <Link to="/alerts/settings">Tutores</Link> },
      ],
    },
    {
      key: 'sub4',
      icon: React.createElement(SettingOutlined),
      label: 'Configuración',
      children: [
        { key: '6', label: <Link to="/editProfile">Perfil</Link> },
        { key: '7', label: <Link to="/alerts/settings">Preferencias de notificacion</Link> },
      ],
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px', height: '100%' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: '100%',
              overflowY: 'auto', // Ensures content can be scrolled if it overflows
            }}
          >
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <Link to="/faq">Preguntas frecuentes</Link>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
