import styled from 'styled-components';

const Wrapper = styled.span`
  padding: 0 0.5em;
  font-size: ${props => (props.fontSize ? props.fontSize : '1em')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : 'normal')};
  color: ${props => (props.color ? props.color : props.theme.color)};
`;

export default Wrapper;