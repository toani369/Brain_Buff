import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../src/store';
import ExerciseList from '../../src/components/exercises/ExerciseList';

describe('ExerciseList Component', () => {
  test('renders table headers Title, Type, Difficulty, Actions', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ExerciseList />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Difficulty')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });
});
