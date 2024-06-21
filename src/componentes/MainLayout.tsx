import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Content, Sider, Footer } = Layout;

// Actualización de items1 con las nuevas rutas y nombres
const items1: MenuProps['items'] = [
  { key: '1', label: <Link to="/welcome">Inicio</Link> },
];

// Actualización de items2 con las nuevas rutas y nombres
const items2: MenuProps['items'] = [
  {
    key: 'sub1',
    icon: React.createElement(UserOutlined),
    label: 'Pacientes',
    children: [
      { key: '1', label: <Link to="/parentsTable">Seleccion pacientes</Link> },
      { key: '2', label: <Link to="/calendar">Lista</Link> },
    ],
  },
  {
    key: 'sub2',
    icon: React.createElement(LaptopOutlined),
    label: 'Vacunas',
    children: [
      { key: '3', label: <Link to="/calendar">Calendario</Link> },
      { key: '4', label: <Link to="/devices/add">Historial</Link> },
      { key: '5', label: <Link to="/devices/settings">Campañas</Link> },
    ],
  },
  {
    key: 'sub3',
    icon: React.createElement(NotificationOutlined),
    label: 'Reportes',
    children: [
      { key: '6', label: <Link to="/alerts">Vacunas</Link> },
      { key: '7', label: <Link to="/alerts/settings">Tutores</Link> },
    ],
  },
  {
    key: 'sub4',
    icon: React.createElement(NotificationOutlined),
    label: 'Configuración',
    children: [
      { key: '8', label: <Link to="/perfil">Perfil</Link> },
      { key: '9', label: <Link to="/alerts/settings">Preferencias de notificacion</Link> },
    ],
  },
];

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
        <Layout style={{ padding: '0 24px 24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flex: '1 0 auto', // Flex item will grow and shrink as needed but with priority to initial size
              overflowY: 'auto', // Ensures content can be scrolled if it overflows
            }}
          >
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center', flexShrink: 0 }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
