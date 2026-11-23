import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewModal from '../../src/components/decks/ReviewModal';

describe('ReviewModal Component', () => {
  const sampleDeck = {
    id: 1,
    title: 'Neuroanatomy Milestones',
    category: 'NEUROSCIENCE',
    cardCount: 12
  };

  test('renders deck details and exact action Start Spaced Repetition', () => {
    render(<ReviewModal deck={sampleDeck} isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('Neuroanatomy Milestones')).toBeInTheDocument();
    expect(screen.getByText('Start Spaced Repetition')).toBeInTheDocument();
  });
});
