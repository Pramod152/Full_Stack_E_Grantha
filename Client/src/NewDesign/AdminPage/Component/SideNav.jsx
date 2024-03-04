import React from "react";
import styled from "styled-components";

const SideNavContainer = styled.div`
  background-color: red;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const NavItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 20px;
`;
const Div = styled.div`
  margin-top: 30px;
`;
const Logo = styled.img`
  height: 50px;
  width: 50px;
  align-items: center;
`;

const SideNav = () => {
  return (
    <>
      <SideNavContainer>
        <Div>
          <Logo as="img" src="/Logo_.png" alt="" />
          <NavItem>Courses</NavItem>
          <NavItem>Users</NavItem>
          <NavItem>Dashboard</NavItem>
          <NavItem>Profile</NavItem>
          <NavItem>Logout</NavItem>
        </Div>
      </SideNavContainer>
    </>
  );
};

export default SideNav;
