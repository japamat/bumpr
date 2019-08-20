import React from 'react'

import Message from '../../Containers/Message';
import Wrapper from './Wrapper';
import LoadingIndicator from '../LoadingIndicator';


function MessageList(props) {
  const { messages, loading, error } = props;

  if (loading) return (
    <Wrapper>
      <LoadingIndicator />
    </Wrapper>
  )

  return (
    <Wrapper>
      {messages.map(m => <Message { ...m } />)}
    </Wrapper>
  )
}

export default MessageList;
