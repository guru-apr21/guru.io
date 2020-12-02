import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1400px;
  height: 100vh;
  background-color: white;
  margin: 0 auto;
  @media screen and (max-width: 700px) {
    transition: 0.8s all ease;
  }
`;

export const HomeLeft = styled.div`
  background-color: #f5f5f5;
  flex: 0.2;
`;

export const HomeRight = styled.div`
  position: relative;
  flex: 0.8;
`;
