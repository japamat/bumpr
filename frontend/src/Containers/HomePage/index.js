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

import {
  makeSelectHomeFeedOffset,
  makeSelectCurrentUserFeed,
  makeSelectHomeLoading,
} from '../HomePage/selectors';
import { makeSelectCurrentUser } from '../App/selectors';
import { loadUserError, loadUserFeed } from '../HomePage/actions';
import MessageList from '../../Components/MessageList';


export class HomePage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       feedOffset: 0,
    }
  }
  
  componentDidMount() {
    const { username } = this.props;
    const { feedOffset } = this.state;
    try {
      this.props.onLoadUserFeed(username, feedOffset);
    } catch (error) {

    }
  }

  render() {
    const { feed, loading, error } = this.props;
    console.log(this.props);
    return (
      <div>
        <h3>
          HOME
        </h3>
        <MessageList messages={feed} loading={loading} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectCurrentUser(),
  feedOffset: makeSelectHomeFeedOffset(),
  feed: makeSelectCurrentUserFeed(),
  loading: makeSelectHomeLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadUserFeed: (username, feedOffset) => dispatch(loadUserFeed(username, feedOffset)),
    onLoadError: error => dispatch(loadUserError(error)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
