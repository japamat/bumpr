/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import { loginPreviousUser, getUserInfo } from '../App/actions';
import HomePage from '../HomePage/Loadable';
import Sidebar from '../Sidebar';
import UserPage from '../UserPage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Footer from '../../Components/Footer';
import { checkMobile } from '../../utils/mobile';

import LoginPage from '../LoginPage';
import { compose } from 'redux';
import {
  makeSelectUserData,
  makeSelectCurrentUser,
  makeSelectAppTheme
} from './selectors';

const ContentWrapper = styled.div`
  max-width: calc(598px + 16px * 2);
  margin-left: ${!checkMobile() ? '88px' : 'auto'}
  margin-top: ${checkMobile() ? '115px' : 'auto'}
  width: ${checkMobile() ? `100%` : 'auto'};
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: ${props => (props.theme ? props.theme.bgColor : '#fff')};
  color: ${props => (props.theme ? props.theme.fontColor : '#000')};
  min-height: 100vh;
  `;
  


export class App extends Component {  
  componentDidMount() {
    this.props.onLoginUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.username !== prevProps.username) {
      this.props.getCurrentUserData(this.props.username);
    }
  }

  render() {
    const { theme } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <BodyWrapper>
          <Sidebar />
          <ContentWrapper>
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
          </ContentWrapper>
        </BodyWrapper>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectCurrentUser(),
  userData: makeSelectUserData(),
  theme: makeSelectAppTheme(),
});

export const mapDispatchToProps = dispatch => {
  return {
    onLoginUser: token => dispatch(loginPreviousUser()),
    getCurrentUserData: username => dispatch(getUserInfo(username)),
  }
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(App);