import React from 'react';
import MemoryDeckList from '../components/decks/MemoryDeckList';
import PageContainer from '../components/layout/PageContainer';

const MemoryHubPage = () => {
  return (
    <PageContainer>
      <MemoryDeckList />
    </PageContainer>
  );
};

export default MemoryHubPage;
