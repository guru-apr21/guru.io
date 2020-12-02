import React, { useEffect, useRef, useState } from 'react';
import {
  MessageCompsoserRow,
  MessageComposerWrapper,
  MessageComposerLayout,
} from './MessageComposerElements';
import Input from '../Input';

const MessageComposer = () => {
  const inputref = useRef();

  useEffect(() => {
    inputref.current.focus();
  }, []);

  const handlePress = (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      console.log(inputref.current.value);
      inputref.current.value = '';
    }
  };

  return (
    <MessageComposerLayout>
      <MessageComposerWrapper>
        <MessageCompsoserRow>
          <Input
            ref={inputref}
            placeholder="Send a message..."
            onKeyPress={handlePress}
          ></Input>
        </MessageCompsoserRow>
      </MessageComposerWrapper>
    </MessageComposerLayout>
  );
};

export default MessageComposer;
