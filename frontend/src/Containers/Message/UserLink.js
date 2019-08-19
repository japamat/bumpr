import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  cursor: pointer;
  outline: 0;
  font-weight: bold;
  font-size: 1.5em;
  color: ${props => props.theme.fontColor};

  &:hover {
    color: #41addd;
  }
`;