import React from 'react';
import styled from 'styled-components';

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Header>
        <Logo src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d4bd99f1d7245ff8c7e2426a0aceac4e3f9a9651b12275b018016e8c02d52ec?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" alt="Company logo" />
        <PlanBadge>Free</PlanBadge>
      </Header>
      
      
      <Nav>
        <MenuItem icon="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F427cd8eeaf494cde7505077f78d47010" title="Dashboard" />
        <MenuItem icon="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fdf930564148632234419016a7cd773cb" title="Customers" />
        <MenuItem icon="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F54d64c57c77a105acdb81199eaa580b4" title="Products" />
        <MenuItem icon="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F32affc8ab23a07e6a8628e41c793cbf1" title="Account" />
        <MenuItem icon="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F783683702c6ec6633717299e11c6ead2" title="Settings" />
        <MenuItem icon="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa9e8489f9653029cbfdf175ea0089d57" title="Login" />
        <MenuItem icon="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F2ef80d62a55fe827c468a59cae2293c5" title="Register" />
        <MenuItem icon="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F9b00efd96d60930bb9bec844be27ce32" title="Error" />
      </Nav>
      
      
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.main`
  background-color: #111827;
  display: flex;
  max-width: 280px;
  flex-direction: column;
  padding: 24px 16px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0 47px;
`;

const Logo = styled.img`
  object-fit: cover;
  width: 42px;
`;

const PlanBadge = styled.span`
  font-family: Inter, sans-serif;
  background-color: #828df8;
  border-radius: 4px;
  padding: 4px 8px;
`;

const UserInfoSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.04);
  margin-top: 24px;
  padding: 11px 24px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyName = styled.h2`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

const UserTier = styled.div`
  color: #9ca3af;
  font-size: 14px;
  display: flex;
  gap: 4px;
`;

const UserAvatar = styled.img`
  width: 20px;
  object-fit: cover;
`;

const MenuItem = ({ icon, title }) => (
  <NavItem>
    <NavIcon src={icon} alt={title} />
    <span>{title}</span>
  </NavItem>
);

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
`;

const NavIcon = styled.img`
  width: 16px;
  object-fit: cover;
`;

const Separator = styled.div`
  background-color: #1f2937;
  height: 1px;
  margin-top: 24px;
  width: 100%;
`;

const PromotionSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  padding: 0 16px;
`;

const PromotionTitle = styled.h2`
  color: #f3f4f6;
  font-size: 16px;
  font-weight: 500;
`;

const PromotionSubTitle = styled.p`
  color: #9ca3af;
`;

const ProPreviewImg = styled.img`
  width: 160px;
  align-self: center;
  margin-top: 16px;
  object-fit: cover;
`;

const PreviewButton = styled.button`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  background-color: #10b981;
  color: #fff;
  border-radius: 8px;
  padding: 8px 56px;
  margin-top: 16px;
  border: none;
  cursor: pointer;
`;

const ButtonIcon = styled.img`
  width: 16px;
`;

export default Dashboard;