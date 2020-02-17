import React from 'react';
import styled, { keyframes, css } from 'styled-components';

import colors from './colors';

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 120%;
  overflow: hidden;
  height: 8px;
`;

const LoaderKeyframes = keyframes`
  from {
    transform: translateX(-56px);
  }

  to {
    transform: translateX(0px);
  }
`;

interface LoaderStyledProps {
  readonly isActive: boolean;
}

const LoaderAnimation = css<LoaderStyledProps>`
  animation: ${LoaderKeyframes} 2.5s infinite linear both;
  animation-play-state: ${({ isActive }): string => (isActive ? 'running' : 'pasued')};
`;

const StyledLoader = styled.div<LoaderStyledProps>`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #2196f3;
  background-image: repeating-linear-gradient(
    135deg,
    ${colors.lightBlue},
    ${colors.lightBlue} 20px,
    ${colors.blue} 0,
    ${colors.blue} 40px
  );
  ${LoaderAnimation};
  opacity: ${({ isActive }): string => (isActive ? '1' : '0')};
  transition: opacity 0.2s linear;
`;

type LoaderProps = { isActive: boolean };

const Loader = ({ isActive }: LoaderProps): JSX.Element => (
  <LoaderContainer>
    <StyledLoader isActive={isActive} />
  </LoaderContainer>
);

export default React.memo(Loader);
