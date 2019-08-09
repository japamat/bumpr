/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectCurrentUser } from '../App/selectors';
import { loginUser } from '../App/actions';


export class HomePage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       username: '',
       password: '',
    }
  }



  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  
  
  render() {
    return (
      <div>
        <h1>
          HOME PAGE
        </h1>
  
      </div>
  
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoginUser: payload => dispatch(loginUser(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);