import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from './images/logo.svg';

const StyledHeader = styled.div`
  padding: 40px 0 30px;
  svg {
    display: block;
    margin: auto;
  }
`;

const Header = () => (
  <StyledHeader>
    <Logo />
  </StyledHeader>
);

export default Header;
