/**
 * Asynchronously loads the component for HomePage
 */

import React from 'react';
import styled from 'styled-components';

import loadable from '../../utils/loadable';
import LoadingIndicator from '../../Components/LoadingIndicator';

const Wrapper = styled.div`
  border-top: 1px solid ${props => (props.theme.borders)};
  border-left: 1px solid ${props => (props.theme.borders)};
  border-right: 1px solid ${props => (props.theme.borders)};
  border-radius: 5px 5px 0 0;
  margin-top: calc(22px + 18.72px * 2);
  min-height: 100vh;
  width: 100vw;
  max-width: calc(598px + 16px * 2);!important
`;


export default loadable(() => import('./index'), {
  fallback: <Wrapper><LoadingIndicator /></Wrapper>,
});
