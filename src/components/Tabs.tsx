import React from 'react';
import styled from 'styled-components';

import colors from './colors';

const StyledTabs = styled.div`
  width: 100%;
  height: 52px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: nowrap;
`;

interface TabProps {
  readonly isActive: boolean;
}

const Tab = styled.button<TabProps>`
  flex-grow: 1;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${(props): string => (props.isActive ? '#fff' : `${colors.fontMain}`)};
  background-color: ${(props): string => (props.isActive ? `${colors.blue}` : '#fff')};
  border: ${(props): string => (props.isActive ? 'none' : '1px solid #dfe5ec')};
  cursor: pointer;
`;

const LeftTab = styled(Tab)`
  border-radius: 5px 0 0 5px;
`;

const RightTab = styled(Tab)`
  border-radius: 0 5px 5px 0;
`;

const defaultProps = {
  sortName: 'price',
};

const changeSortToPice = (changeSort: (sortName: string) => void) => (): void => {
  changeSort('price');
};

const changeSortToSpeed = (changeSort: (sortName: string) => void) => (): void => {
  changeSort('speed');
};

type TabsProps = { changeSort: (sortName: string) => void; sortName: string } & typeof defaultProps;

const Tabs = ({ changeSort, sortName }: TabsProps): JSX.Element => (
  <StyledTabs>
    <LeftTab isActive={sortName === 'price'} onClick={changeSortToPice(changeSort)}>
      Самый дешевый
    </LeftTab>
    <RightTab isActive={sortName === 'speed'} onClick={changeSortToSpeed(changeSort)}>
      Самый быстрый
    </RightTab>
  </StyledTabs>
);

export default React.memo(Tabs);
