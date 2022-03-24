import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const incElement = screen.getByText(/\+/i);
  const decElement = screen.getByText(/-/i);
  const countElement = screen.getByText(/0/i);

  expect(incElement).toBeInTheDocument();
  expect(decElement).toBeInTheDocument();
  expect(countElement).toBeInTheDocument();
});
