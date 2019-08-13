import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 1em;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  border-top: 1px solid #000;

  &:first-child {
    border-top: none;
  }
`;

export default Wrapper;