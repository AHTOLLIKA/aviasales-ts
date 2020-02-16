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
  color: ${props => (props.isActive ? '#fff' : `${colors.fontMain}`)};
  background-color: ${props => (props.isActive ? `${colors.blue}` : '#fff')};
  border: ${props => (props.isActive ? 'none' : '1px solid #dfe5ec')};
  cursor: pointer;
`;

const LeftTab = styled(Tab)`
  border-radius: 5px 0 0 5px;
`;

const RightTab = styled(Tab)`
  border-radius: 0 5px 5px 0;
`;

type TabsProps = { changeSort: (event: any) => void; sortName: string } & typeof defaultProps;

const defaultProps = {
  sortName: 'price',
};

const Tabs = React.memo(({ changeSort, sortName }: TabsProps) => (
  <StyledTabs>
    <LeftTab isActive={sortName === 'price'} data-value="price" onClick={changeSort}>
      Самый дешевый
    </LeftTab>
    <RightTab isActive={sortName === 'speed'} data-value="speed" onClick={changeSort}>
      Самый быстрый
    </RightTab>
  </StyledTabs>
));

export default Tabs;
