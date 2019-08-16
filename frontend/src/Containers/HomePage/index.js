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
import Message from '../Message';


export class HomePage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       feedOffset: 0,
    }
  }
  
  async componentDidMount() {
    const { username } = this.props;
    const { feedOffset } = this.state;
    try {
      this.props.onLoadUser(username, feedOffset);
    } catch (error) {

    }
  }

  render() {
    const { feed, about } = this.props.currentUserData;
    console.log(about)

    return (
      <div>
        <h1>
          { this.props.username }
        </h1>
        <h3>
          FOLLOWING: { about ? about.following : 0 }
        </h3>
        <h3>
          FOLLOWERS: { about ? about.followers : 0 }
        </h3>
        <h3>
          FEED
        </h3>
        { this.props.currentUserData ? (
          feed.map(message => (
            <Message { ...message } />
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