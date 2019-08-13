/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import { loginPreviousUser } from '../App/actions';
import HomePage from '../HomePage/Loadable';
import UserPage from '../UserPage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

import GlobalStyle from '../../global-styles';
import LoginPage from '../LoginPage';
import history from '../../utils/history';
import { compose } from 'redux';
import { makeSelectCurrentUser } from './selectors';

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

export class App extends Component {
  componentDidMount() {
    console.log('mounted!');
    this.props.onLoginUser();
    
  }

  render() {
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
            <Route exact path="/users/:username" component={UserPage} />
            <Redirect to="/home" />
            <Route path="" component={NotFoundPage} />
          </Switch>
          <Footer />
          <GlobalStyle />
        </AppWrapper>
      </BodyWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectCurrentUser(),
});

export const mapDispatchToProps = dispatch => {
  return {
    onLoginUser: token => dispatch(loginPreviousUser())
  }
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(App);