import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import IconRow from './IconRow';
import IconWrapper from './IconWrapper';
import UserWrapper from './UserWrapper';
import UsernameWrapper from './UsernameWrapper';
import ImgWrapper from './ImgWrapper';
import TextWrapper from './TextWrapper';
import RebumpWrapper from './RebumpWrapper';
import UserLink from './UserLink';
import Span from '../../Components/Span';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeSelectCurrentUser } from '../App/selectors';
import { createStructuredSelector } from 'reselect';

const propTypes = {};

const defaultProps = {};

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { count,
      message,
      timestamp,
      username,
      image_url,
      rebumps,
      currentUser,
      direct_follow,
      num_comments,
      num_likes,
      num_rebumps,
      likes,
    } = this.props;

    const iconProps = {
      fill: `#7f7f7f`,
      width: `24`,
      height: `24`,
    }

    const likeIcon = likes.indexOf(currentUser) > -1 ? 'liked' : 'likes';
    const content = !direct_follow && rebumps[0][1] ?
      (
        <div>
          <UserLink to={this.props.match.params.username ? `${rebumps[0][0]}` : `users/${rebumps[0][0]}`} >
            {rebumps[0][0]} 
          </UserLink><Span color="#6e6e6e" fontSize="0.85em">rebumped:</Span>
          <TextWrapper>{rebumps[0][1]}</TextWrapper>
          <RebumpWrapper>
            <UserWrapper>
              <ImgWrapper username={username} image_url={image_url}/>
              <UserLink to={this.props.match.params.username ? `${username}` : `users/${username}`} >
                {username}
              </UserLink>
            </UserWrapper>
            <TextWrapper>{message}</TextWrapper>
          </RebumpWrapper>
        </div>
      ) : (
        <div>
          <Span color="#6e6e6e" fontSize="0.85em" >
            { !direct_follow && rebumps[0][0] ? `${rebumps[0][0]} rebumped` : null }
          </Span>
          <UserWrapper>
            <ImgWrapper username={username} image_url={image_url}/>
            <UserLink to={this.props.match.params.username ? `${username}` : `users/${username}`} >
              {username}
            </UserLink>
          </UserWrapper>
          <TextWrapper>{message}</TextWrapper>
        </div>
      );

    return (
      <Wrapper>
        {content}
        <IconRow>
          <IconWrapper iconProps={{ ...iconProps, name: "comment", count: num_comments, }} />
          <IconWrapper iconProps={{ ...iconProps, name: likeIcon, count: num_likes, }} />
          <IconWrapper iconProps={{ ...iconProps, name: "rebump", count: num_rebumps, }} />
        </IconRow>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

export function mapDispatchToProps(dispatch) {
  // return {
  //   onLoadUser: (username, feedOffset) => dispatch(loadUser(username, feedOffset)),
  //   onLoadError: error => dispatch(loadUserError(error)),
  // };
}

const withConnect = connect(
  mapStateToProps,
  {},
);

const connectedMessage = compose(withConnect)(Message);

export default withRouter(connectedMessage);