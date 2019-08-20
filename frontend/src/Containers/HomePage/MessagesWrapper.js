import styled from 'styled-components';

const Wrapper = styled.div`
  border-top: 1px solid ${props => (props.theme.borders)};
  border-left: 1px solid ${props => (props.theme.borders)};
  border-right: 1px solid ${props => (props.theme.borders)};
  border-radius: 5px 5px 0 0;
  min-height: 100vh;
  width: 100vw;
  max-width: calc(598px + 16px * 2);!important
`;

export default Wrapper;