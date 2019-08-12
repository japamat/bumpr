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

import { makeSelectCurrentUserData } from '../HomePage/selectors';
import { makeSelectCurrentUser } from '../App/selectors';
import { loadUser, loadUserError } from '../HomePage/actions';


export class HomePage extends Component {
  async componentDidMount() {
    try {
      this.props.onLoadUser( this.props.username );
    } catch (error) {

    }
  }

  render() {
    const { following } = this.props.currentUserData;
    console.log(following);
    
    return (
      <div>
        <h1>
          { this.props.username }
        </h1>
        <h1>
          FOLLOWING:
        </h1>
        { this.props.currentUserData ? (
          following.map(user => (
            <h5>{user.username}</h5>
          ))
        ) : null }
  
      </div>
  
    );
  }
}
const mapStateToProps = createStructuredSelector({
  username: makeSelectCurrentUser(),
  currentUserData: makeSelectCurrentUserData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadUser: username => dispatch(loadUser(username)),
    onLoadError: error => dispatch(loadUserError(error)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);