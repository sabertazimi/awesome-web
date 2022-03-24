import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const incElement = screen.getByText(/\+/i);
  const decElement = screen.getByText(/-/i);
  const countElement = screen.getByText(0);

  expect(incElement).toBeInTheDocument();
  expect(decElement).toBeInTheDocument();
  expect(countElement).toBeInTheDocument();
  expect(countElement.textContent).toBe('0');

  fireEvent.click(incElement);
  expect(countElement.textContent).toBe('1');
  fireEvent.click(incElement);
  expect(countElement.textContent).toBe('2');
  fireEvent.click(incElement);
  expect(countElement.textContent).toBe('3');

  fireEvent.click(decElement);
  expect(countElement.textContent).toBe('2');
  fireEvent.click(decElement);
  expect(countElement.textContent).toBe('1');
  fireEvent.click(decElement);
  expect(countElement.textContent).toBe('0');
  fireEvent.click(decElement);
  expect(countElement.textContent).toBe('-1');
  fireEvent.click(decElement);
  expect(countElement.textContent).toBe('-2');
});
