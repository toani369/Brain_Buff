import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../src/store';
import Login from '../../src/components/auth/Login';

describe('Login Component', () => {
  const renderLogin = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  };

  test('renders login form elements and exact placeholders', () => {
    renderLogin();
    expect(screen.getByText('Login to BrainBuff')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText('Register here')).toBeInTheDocument();
  });

  test('updates username and password fields on change', () => {
    renderLogin();
    const usernameInput = screen.getByPlaceholderText('Enter username');
    const passwordInput = screen.getByPlaceholderText('Enter password');

    fireEvent.change(usernameInput, { target: { value: 'neuro_trainee' } });
    fireEvent.change(passwordInput, { target: { value: 'securePass123' } });

    expect(usernameInput.value).toBe('neuro_trainee');
    expect(passwordInput.value).toBe('securePass123');
  });
});
