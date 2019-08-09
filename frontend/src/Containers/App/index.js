/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import styled from 'styled-components';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

import HomePage from '../HomePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

import GlobalStyle from '../../global-styles';
import LoginPage from '../LoginPage';
import history from '../../utils/history';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

const BodyWrapper = styled.div`
  background-color: #e3e3e3;
  width: 100%;
  min-height: 100vh;
`;

export default function App() {
  return (
    <BodyWrapper>
      <Header />
      <AppWrapper>
          <meta
            name="bumpr - give things a bump"
            content="A project by Jason Matthias"
          />
        <Switch>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Redirect to="/home" />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <Footer />
        <GlobalStyle />
      </AppWrapper>
    </BodyWrapper>
  );
}