import React from 'react';
import { useParams } from 'react-router-dom';
import TrainingSession from '../components/exercises/TrainingSession';
import PageContainer from '../components/layout/PageContainer';

const TrainingSessionPage = () => {
  const { id } = useParams();

  return (
    <PageContainer>
      <TrainingSession exerciseId={id} />
    </PageContainer>
  );
};

export default TrainingSessionPage;
