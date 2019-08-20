import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  border: 1px solid ${props => (props.theme.borders)};
  border-radius: 15px;
`;

export default Wrapper;