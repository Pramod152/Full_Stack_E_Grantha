import React from "react";
import styled from "styled-components";

const DashboardLayout = () => {
  return (
    <MainContainer>
      <Header>
        <Logo src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e79521c3db773d3bbd3f653252fba5537558187cf65179e8ed7771dc897aa71?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" alt="Logo" />
        <IconContainer>
          <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/65520e4fa4b09a25c276748d2b0da612aaf911f4a6663418e02e045fe85a3bf2?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" alt="Icon 1" />
          <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/569426074d187acb655343194c5b59ca0b1cd0046125f5874d29c6b4716d5981?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" alt="Icon 2" />
          <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ab22d63a38395842777b08b2e69f5eff63a6260a017f6c03921f04f9da43f97?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" alt="Icon 3" />
        </IconContainer>
      </Header>
      <Sidebar>
        <UserInfo>
          <UserAvatar src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d4bd99f1d7245ff8c7e2426a0aceac4e3f9a9651b12275b018016e8c02d52ec?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" alt="User" />
          <Tag>Free</Tag>
        </UserInfo>
        <CompanyName>Acme Inc</CompanyName>
        <UserTier>
          <TierLabel>Your tier:</TierLabel> <TierValue>Premium</TierValue>
        </UserTier>
        <Separator />
        <Navigation>
          <MenuItem src="https://cdn.builder.io/api/v1/image/assets/TEMP/d36bbc7501504c9dfede3c194c0bbb8e4b11203094da5493a32cac2cf09e5ada?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" text="Dashboard" />
          <MenuItem src="https://cdn.builder.io/api/v1/image/assets/TEMP/427cd8eeaf494cde7505077f78d47010ba94b3f68de8920b022576bd7b395159?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" text="Customers" />
          <MenuItem src="https://cdn.builder.io/api/v1/image/assets/TEMP/df930564148632234419016a7cd773cb2eeae2426ebc6627583b9be320b10218?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" text="Products" />
          <MenuItem src="https://cdn.builder.io/api/v1/image/assets/TEMP/54d64c57c77a105acdb81199eaa580b499fced4f1f9a80bf33dbf55869038723?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" text="Account" />
          <MenuItem src="https://cdn.builder.io/api/v1/image/assets/TEMP/32affc8ab23a07e6a8628e41c793cbf14620ccde4588f023e13ad75e2b30f896?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" text="Settings" />
          <MenuItem src="https://cdn.builder.io/api/v1/image/assets/TEMP/783683702c6ec6633717299e11c6ead2813a38aa84dc9c4e4feaf26c2a3264b5?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" text="Login" />
          <MenuItem src="https://cdn.builder.io/api/v1/image/assets/TEMP/a9e8489f9653029cbfdf175ea0089d57d43f0685d62d58eee10fb58a1d23ce08?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" text="Register" />
          <MenuItem src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ef80d62a55fe827c468a59cae2293c52e0128a6b82830cfeef84bffebaf31f0?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" text="Error" />
        </Navigation>
      </Sidebar>
    </MainContainer>
  );
};

// Styled Components
const MainContainer = styled.main`
  width: 100%;
`;

const Header = styled.header`
  box-shadow: 0 4px 6px rgba(100, 116, 139, 0.12), 0 2px 4px rgba(31, 41, 55, 0.06);
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 12px 28px;
`;

const Sidebar = styled.aside`
  background-color: #111827;
  display: flex;
  flex-direction: column;
  width: 280px;
  padding: 24px 0;
`;

const IconContainer = styled.div`
  align-items: center;
  display: flex;
  padding-left: 8px;
  justify-content: space-between;
  gap: 20px;
`;

const Icon = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  width: 24px;
`;

const Logo = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  width: 24px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 47px;
`;

const UserAvatar = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  width: 42px;
`;

const Tag = styled.span`
  background-color: #828df8;
  border-radius: 4px;
  padding: 4px 8px;
`;

const CompanyName = styled.h2`
  color: #fff;
  font-weight: 500;
  margin-top: 24px;
  padding: 0 24px;
`;

const UserTier = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  padding: 11px 24px;
  margin-top: 24px;
`;

const TierLabel = styled.span`
  color: #9ca3af;
`;

const TierValue = styled.span`
  color: #fff;
  margin-left: 4px;
`;

const Separator = styled.div`
  background-color: #1f2937;
  height: 1px;
  margin-top: 24px;
`;

const Navigation = styled.nav`
  margin-top: 24px;
`;

const MenuItem = ({ src, text }) => (
  <NavLink>
    <NavItemIcon src={src} alt={`${text} icon`} />
    <NavItemText>{text}</NavItemText>
  </NavLink>
);

const NavLink = styled.a`
  display: flex;
  gap: 8px;
  color: #d1d5db;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
  text-decoration: none;
`;

const NavItemIcon = styled.img`
  aspect-ratio: 0.8;
  object-fit: cover;
  width: 16px;
`;

const NavItemText = styled.span`
  color: inherit;
`;

const PromotionSection = styled.section`
  padding: 0 16px;
  margin-top: 24px;
`;

const PromotionTitle = styled.h3`
  color: #f3f4f6;
  font-weight: 500;
`;

const PromotionSubtitle = styled.p`
  color: #9ca3af;
`;

const TemplatePreview = styled.img`
  aspect-ratio: 1.18;
  object-fit: cover;
  width: 160px;
  align-self: center;
  margin-top: 16px;
`;

const ProPreview = styled.a`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  background-color: #10b981;
  color: #fff;
  font-weight: 600;
  border-radius: 8px;
  margin-top: 16px;
  padding: 8px 56px;
  text-decoration: none;
  align-items: center;
`;

const PreviewText = styled.span`
  flex-grow: 1;
`;

export default DashboardLayout;