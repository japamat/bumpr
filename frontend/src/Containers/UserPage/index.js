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
import { makeSelectUserData, makeSelectLoadingUser } from './selectors';
import MessageList from '../../Components/MessageList';
import LoadingIndicator from '../../Components/LoadingIndicator';


export class UserPage extends Component {
  componentDidMount() {
    const { messagesOffset } = this.props;
    const { username } = this.props.match.params;    
    try {
      this.props.onLoadUser(username, messagesOffset);
    } catch (error) {
      console.log(`things broke in the userpage comp`);
      
    }
  }

  componentDidUpdate(prevProps) {
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
    console.log(this.props)
    const { following, followers, username, messages } = this.props.userData;
    const { loading } = this.props;
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
          <MessageList messages={messages} loading={loading} />
        </div>
      </div>
  
    );
  }
}
const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
  loading: makeSelectLoadingUser(),
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