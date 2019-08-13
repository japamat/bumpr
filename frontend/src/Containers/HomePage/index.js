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

import { makeSelectCurrentUserData, makeSelectHomeFeedOffset } from '../HomePage/selectors';
import { makeSelectCurrentUser } from '../App/selectors';
import { loadUser, loadUserError } from '../HomePage/actions';


export class HomePage extends Component {
  async componentDidMount() {
    const { username, feedOffset } = this.props;
    console.log(`in homepage comp: `, this.props);
    
    try {
      this.props.onLoadUser(username, feedOffset);
    } catch (error) {

    }
  }

  render() {
    const { following, followers, feed } = this.props.currentUserData;
    
    return (
      <div>
        <h1>
          { this.props.username }
        </h1>
        <h3>
          FOLLOWING: { following ? following.length : 0 }
        </h3>
        <h3>
          FOLLOWERS: { followers ? followers.length : 0 }
        </h3>
        <h3>
          FEED
        </h3>
        { this.props.currentUserData ? (
          feed.map(message => (
            <div>
              <h5>{message.username}</h5>
              <div>{message.message}</div>
              <div><small>{message.timestamp}</small></div>
            </div>
          ))
        ) : null }
  
      </div>
  
    );
  }
}
const mapStateToProps = createStructuredSelector({
  username: makeSelectCurrentUser(),
  feedOffset: makeSelectHomeFeedOffset(),
  currentUserData: makeSelectCurrentUserData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadUser: (username, feedOffset) => dispatch(loadUser(username, feedOffset)),
    onLoadError: error => dispatch(loadUserError(error)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);