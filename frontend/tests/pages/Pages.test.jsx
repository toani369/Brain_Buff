import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../src/store';

import NotFoundPage from '../../src/pages/NotFoundPage';
import ProfilePage from '../../src/pages/ProfilePage';
import DashboardPage from '../../src/pages/DashboardPage';

describe('Pages Rendering Tests', () => {
  const renderWithProviders = (ui) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    );
  };

  test('NotFoundPage renders 404 message and navigation', () => {
    renderWithProviders(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Return to Dashboard')).toBeInTheDocument();
  });

  test('ProfilePage renders user profile information', () => {
    renderWithProviders(<ProfilePage />);
    expect(screen.getByText('User Profile')).toBeInTheDocument();
    expect(screen.getByText('Cognitive Training Preferences')).toBeInTheDocument();
  });

  test('DashboardPage renders dashboard components', () => {
    renderWithProviders(<DashboardPage />);
    expect(screen.getByText('Memory Index')).toBeInTheDocument();
    expect(screen.getByText('Processing Speed')).toBeInTheDocument();
  });
});
