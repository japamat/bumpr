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
import { makeSelectUserData, makeSelectUserMessagesOffset } from './selectors';
import LoadingIndicator from '../../Components/LoadingIndicator';


export class UserPage extends Component {
  async componentDidMount() {
    const { messagesOffset } = this.props;
    const { username } = this.props.match.params;

    
    try {
      this.props.onLoadUser(username, messagesOffset);
    } catch (error) {
      console.log(`shit broke in the userpage comp`);
      
    }
  }

  render() {
    const { following, followers, username, messages } = this.props.userData;
    console.log(`in user page comp: `, username);
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
              <div>
                <div>{message.message}</div>
                <span>{message.timestamp}</span>
              </div>
            ))
          ) : 0 }
        </div>
      </div>
  
    );
  }
}
const mapStateToProps = createStructuredSelector({
  messagesOffset: makeSelectUserMessagesOffset(),
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