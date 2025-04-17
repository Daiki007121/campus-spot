import { render, screen } from '@testing-library/react';
import App from './App';

// Setup for using mock router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => children
}));

test('renders CampusSpot application', () => {
  render(<App />);
  const titleElement = screen.getByText(/CampusSpot/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders application tagline', () => {
  render(<App />);
  const taglineElement = screen.getByText(/Find the perfect study spot on campus/i);
  expect(taglineElement).toBeInTheDocument();
});
