import React from 'react';
import { HomeContainer, HomeLeft, HomeRight } from './HomeElements';
import MessageComposer from '../MessageComposer';

const Home = () => {
  return (
    <HomeContainer>
      <HomeLeft>
        <form>
          <input></input>
        </form>
      </HomeLeft>
      <HomeRight>
        <MessageComposer></MessageComposer>
      </HomeRight>
    </HomeContainer>
  );
};

export default Home;
