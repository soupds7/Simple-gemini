import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the chat application', () => {
  render(<App />);
  const linkElement = screen.getByText(/chat/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders the header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Welcome to the AI Chat App/i);
  expect(headerElement).toBeInTheDocument();
});