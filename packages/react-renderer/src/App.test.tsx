import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const incElement = screen.getByText(/\+/i);
  const decElement = screen.getByText(/-/i);

  expect(incElement).toBeInTheDocument();
  expect(decElement).toBeInTheDocument();
  expect(screen.getByText(0)).toBeInTheDocument();

  fireEvent.click(incElement);
  expect(screen.getByText(1)).toBeInTheDocument();
  fireEvent.click(incElement);
  expect(screen.getByText(2)).toBeInTheDocument();
  fireEvent.click(incElement);
  expect(screen.getByText(3)).toBeInTheDocument();

  fireEvent.click(decElement);
  expect(screen.getByText(2)).toBeInTheDocument();
  fireEvent.click(decElement);
  expect(screen.getByText(1)).toBeInTheDocument();
  fireEvent.click(decElement);
  expect(screen.getByText(0)).toBeInTheDocument();
});
