import React from 'react';
import GlobalStyle from './components/GlobalStyle';
import Header from './components/Header';
import Main from './components/Main';

const App = (): JSX.Element => (
  <>
    <GlobalStyle />
    <Header />
    <Main />
  </>
);

export default App;
