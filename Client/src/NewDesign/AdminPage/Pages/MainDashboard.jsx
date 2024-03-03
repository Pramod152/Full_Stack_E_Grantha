import React, { useState } from "react";
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

// MainDashboard component
const MainDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Container>
      {showSidebar && (
        <Sidebar>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>About</ListItem>
          </List>
        </Sidebar>
      )}
      <ContentWrapper>
        <Topbar>
          <ToggleMenuButton onClick={toggleSidebar}>
            {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
          </ToggleMenuButton>
          <Title>React sidebar with dropdown</Title>
        </Topbar>
        <PageWrapper>
          <Content>This is the content area</Content>
        </PageWrapper>
      </ContentWrapper>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: ${sizeConfigs.sidebar.width};
  flex-shrink: 0;
  background-color: ${colorConfigs.sidebar.bg};
  color: ${colorConfigs.sidebar.color};
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 12px 24px;
  font-size: 18px; /* Adjust the font size */
  &:hover {
    background-color: ${colorConfigs.sidebar.hoverBg};
    border-left: 4px solid #ffc107; /* Highlight the active item */
  }
`;

const Topbar = styled.div`
  background-color: ${colorConfigs.topbar.bg};
  color: ${colorConfigs.topbar.color};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const ToggleMenuButton = styled.button`
  background: none;
  border: none;
  color: ${colorConfigs.topbar.color};
  cursor: pointer;
`;

const Title = styled.h1`
  margin: 20px 0;
  text-align: center; /* Center align the title */
  font-size: 24px; /* Adjust the font size */
`;

const PageWrapper = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: ${colorConfigs.mainBg};
`;

const Content = styled.div`
  background-color: #fff;
  padding: 20px;
`;

export default MainDashboard;
