import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import IconRow from './IconRow';
import IconWrapper from './IconWrapper';
import UserWrapper from './UserWrapper';
import ImgWrapper from './ImgWrapper';
import TextWrapper from './TextWrapper';
import UserLink from './UserLink';

const propTypes = {};

const defaultProps = {};

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { count, message, timestamp, username, image_url } = this.props;
    const iconProps = {
      fill: `#000`,
      width: `24`,
      height: `24`,
    }
    
    return (
      <Wrapper>
        <UserWrapper>
          <ImgWrapper username={username} image_url={image_url}/>
          <UserLink to={`users/${username}`} >
            {username}
          </UserLink>
        </UserWrapper>
        <TextWrapper>{message}</TextWrapper>
        <IconRow>
          <IconWrapper iconProps={{ ...iconProps, name: "comment", count, }} />
          <IconWrapper iconProps={{ ...iconProps, name: "likes", count, }} />
          <IconWrapper iconProps={{ ...iconProps, name: "rebump", count, }} />
        </IconRow>
      </Wrapper>
    );
  }
}

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;

export default Message;