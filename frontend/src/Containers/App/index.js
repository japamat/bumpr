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
import UserPage from '../UserPage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

import GlobalStyle from '../../global-styles';
import LoginPage from '../LoginPage';
import history from '../../utils/history';
import { compose } from 'redux';
import { makeSelectUserData, makeSelectCurrentUser } from './selectors';
import themes from '../../utils/themes';

const AppWrapper = styled.div`
  max-width: calc(598px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

const BodyWrapper = styled.div`
  background-color: ${props => (props.theme ? props.theme.bgColor : '#fff')};
  color: ${props => (props.theme ? props.theme.fontColor : '#000')};
  width: 100%;
  min-height: 100vh;
`;

const SidebarWrapper = styled.div`
  
`;

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       theme: themes.darkTheme,
    }
  }
  
  componentDidMount() {
    this.props.onLoginUser();
  }

  componentDidUpdate(prevProps) {
    console.log(`props: `, this.props);
    console.log(`prevProps: `, prevProps);
    if (this.props.username !== prevProps.username) {
      this.props.getCurrentUserData(this.props.username);
    }
  }

  render() {
    const { theme } = this.state;
    return (
      <ThemeProvider theme={theme}>
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
          </AppWrapper>
        </BodyWrapper>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectCurrentUser(),
  userData: makeSelectUserData(),
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