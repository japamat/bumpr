import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 75px;
  height: 75px;
  margin-right: 1em;
  background-image: url("${props => props.image_url}");
  background-position: center;
  background-size: contain;
  border: 3px solid ${props => props.theme.borders};
  border-radius: 50%;

  &:hover {
    opacity: 0.6;
  }
`;

function img (props) {
  return (
    <Link to={`users/${props.username}`}>
      <Wrapper {...props} />
    </Link>
  );
}

export default img;