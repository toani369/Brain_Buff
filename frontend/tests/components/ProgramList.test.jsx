import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../src/store';
import ProgramList from '../../src/components/programs/ProgramList';

describe('ProgramList Component', () => {
  test('renders table headers Program Name, Focus Area, Duration, Actions', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProgramList />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Program Name')).toBeInTheDocument();
    expect(screen.getByText('Focus Area')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });
});
