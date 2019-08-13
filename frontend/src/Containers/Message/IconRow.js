import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 3em;
  display: flex;
  justify-content: flex-start;
  position: relative;

  &:first-child {
    border-top: none;
  }
`;

export default Wrapper;