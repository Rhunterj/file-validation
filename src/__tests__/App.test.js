import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the app', () => {
  render(<App />);
  expect(screen.getByText(/Provide your file here:/i)).toBeInTheDocument();
});
