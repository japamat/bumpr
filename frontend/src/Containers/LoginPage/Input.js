import styled from 'styled-components';

const Input = styled.input`
  outline: none;
  border: none;
  margin: 3px;
  font-size: 1.75em;
  border-bottom: 1px solid ${props => (props.theme.color || '#999')};
  background-color: transparent;
`;

export default Input;