import React from "react";
import styled from "styled-components";

const NavigationBar = () => (
  <Nav>
    <Logo src="https://cdn.builder.io/api/v1/image/assets/TEMP/db971340cba853ceb22d3e2fbbda268ade3fd39b8801c32a1737cc23cfe8e022?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" alt="Logo" />
    <IconContainer>
      <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e4a48e4fa41466dbdfbb4a7a54e5c6008e2db270a893ef31a1ca2d234d12f02?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" alt="Search" />
      <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/e376e6d83652878e25339bb3f4d6ba2e5de4bf5813673bad739ecb9d4b2e5498?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" alt="Cart" />
      <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ab22d63a38395842777b08b2e69f5eff63a6260a017f6c03921f04f9da43f97?apiKey=3c83b42fd7b3487a8f5a88c785600e26&" alt="User" />
    </IconContainer>
  </Nav>
);

const Nav = styled.nav`
  box-shadow: 0 4px 6px rgba(100, 116, 139, 0.12), 0 2px 4px rgba(31, 41, 55, 0.06);
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 12px 28px;
  @media (max-width: 991px) {
    flex-wrap: wrap;
    padding: 0 20px;
  }
`;

const Logo = styled.img`
  width: 24px;
  aspect-ratio: 1;
  margin: auto 0;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Icon = styled.img`
  width: 24px;
  aspect-ratio: 1;
  margin: auto 0;
`;

export default NavigationBar;