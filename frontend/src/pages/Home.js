import React from 'react';
import MainContainer from '../components/Container';
import Header from '../components/Header';
import InsertButton from '../components/ButtonInsert';
import ListHome from '../components/List';

function Home() {
  return (
    <MainContainer>
      <Header />
      <InsertButton />
      <ListHome />
    </MainContainer>
  );
}

export default Home;