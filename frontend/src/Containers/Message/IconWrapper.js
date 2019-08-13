import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Icon from '../../Components/Icon';
import Span from '../../Components/Span';

const Wrapper = styled.div`
  height: 3em;
  display: flex;
  align-items: center;
  position: relative;
  border-top: 1px solid #000;

  &:first-child {
    border-top: none;
  }
`;

const Spacer = styled.div`
  margin: 1em;
`;

const propTypes = {};

const defaultProps = {};

class IconWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { count } = this.props.iconProps;
    
    return (
      <Spacer>
        <Wrapper>
          <Icon { ...this.props.iconProps } />
          <Span>{count}</Span>
        </Wrapper>
      </Spacer>
    );
  }
}

 IconWrapper.propTypes = propTypes;
 IconWrapper.defaultProps = defaultProps;

export default IconWrapper;