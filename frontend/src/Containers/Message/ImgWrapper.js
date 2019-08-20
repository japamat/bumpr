import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 3em;
  height: 3em;
  margin-right: 1em;
  background-image: url("${props => props.image_url}");
  background-position: center;
  background-size: contain;
  border: 5px solid ${props => props.theme.highlight};
  border-radius: 50%;
  transition-duration: 0.25s;

  &:hover {
    opacity: 0.6;
    -ms-transform: scale(1.1, 1.1);
    -webkit-transform: scale(1.1, 1.1);
    transform: scale(1.1, 1.1);
    border: 5px solid ${props => props.theme.accent};
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