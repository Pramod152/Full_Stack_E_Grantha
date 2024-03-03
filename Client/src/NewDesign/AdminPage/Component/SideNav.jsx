// MainDashboard.js

import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import styled from "styled-components";

// Define color configurations
const colorConfigs = {
  sidebar: {
    bg: "#233044",
    color: "#eeeeee",
    hoverBg: "#1e293a",
    activeBg: "#1e253a",
  },
  topbar: {
    bg: "#fff",
    color: "#000",
  },
  mainBg: "#f0f0f0",
};

// Define size configurations
const sizeConfigs = {
  sidebar: {
    width: "300px",
  },
};

// Define routes
const routes = [
  { path: "/", displayText: "Home", component: Home },
  { path: "/about", displayText: "About", component: About },
];

// MainDashboard component
const MainDashboard = () => {
  return (
    <Router>
      <Sidebar>
        <List>
          {routes.map((route, index) => (
            <ListItem key={index} to={route.path}>
              {route.displayText}
            </ListItem>
          ))}
        </List>
      </Sidebar>
      <Topbar>
        <Title>React sidebar with dropdown</Title>
      </Topbar>
      <PageWrapper>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              exact
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </PageWrapper>
    </Router>
  );
};

// Sidebar styles
const Sidebar = styled.div`
  width: ${sizeConfigs.sidebar.width};
  flex-shrink: 0;
  background-color: ${colorConfigs.sidebar.bg};
  color: ${colorConfigs.sidebar.color};
`;

// List styles
const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

// ListItem styles
const ListItem = styled.li`
  padding: 12px 24px;
  &:hover {
    background-color: ${colorConfigs.sidebar.hoverBg};
  }
`;

// Topbar styles
const Topbar = styled.div`
  width: calc(100% - ${sizeConfigs.sidebar.width});
  margin-left: ${sizeConfigs.sidebar.width};
  background-color: ${colorConfigs.topbar.bg};
  color: ${colorConfigs.topbar.color};
`;

// Title styles
const Title = styled.h1`
  margin: 20px 0;
  text-align: center;
`;

// PageWrapper styles
const PageWrapper = styled.div`
  margin-top: 64px;
  margin-left: ${sizeConfigs.sidebar.width};
  background-color: ${colorConfigs.mainBg};
`;

// Home component
const Home = () => {
  return <div>This is the Home page</div>;
};

// About component
const About = () => {
  return <div>This is the About page</div>;
};

export default MainDashboard;
