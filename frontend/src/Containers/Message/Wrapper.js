import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding: 1em;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  border-top: 1px solid ${props => (props.theme.borders)};
  max-width: calc(598px + 16px * 2) !important;

  &:first-child {
    border-top: none;
  }
`;

export default Wrapper;