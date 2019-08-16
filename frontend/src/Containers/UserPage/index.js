/*
 * UserPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { loadUser, loadUserError } from './actions';
import Message from '../Message';
import { makeSelectUserData } from './selectors';
import LoadingIndicator from '../../Components/LoadingIndicator';


export class UserPage extends Component {
  async componentDidMount() {
    const { messagesOffset } = this.props;
    const { username } = this.props.match.params;    
    try {
      this.props.onLoadUser(username, messagesOffset);
    } catch (error) {
      console.log(`things broke in the userpage comp`);
      
    }
  }

  async componentDidUpdate(prevProps) {
    const newUsername = this.props.match.params.username;
    const oldUsername = this.props.userData.username;
    if (newUsername !== oldUsername) {
      try {
        this.props.onLoadUser(newUsername, 0);
      } catch (error) {
        console.log(`things broke in the userpage comp`);
      }
    }
  }

  render() {
    const { following, followers, username, messages } = this.props.userData;
    return (
      <div>
        <h1>{ username || `loading...` }</h1>
        <h3>
          FOLLOWING: { following ? following.length : 0 }
        </h3>
        <h3>
          FOLLOWERS: { followers ? followers.length : 0 }
        </h3>
        <h3>
          MESSAGES
        </h3>
        <div>
        { messages ? (
            messages.map(message => (
              <Message count={50} { ...message } />
            ))
          ) : 0 }
        </div>
      </div>
  
    );
  }
}
const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadUser: (username, messagesOffset) => dispatch(loadUser(username, messagesOffset)),
    onLoadError: error => dispatch(loadUserError(error)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UserPage);