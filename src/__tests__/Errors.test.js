import { render, screen } from '@testing-library/react';
import { Errors } from '../components/Errors/Errors';
import { errorsMock } from '../__mocks__/errorsMock';

test('renders the Errors', () => {
  render(<Errors errors={errorsMock} />);
  expect(screen.getByText(/Duplicate key errors:/i)).toBeInTheDocument();
  expect(screen.getByText(/Incorrected end balance errors:/i)).toBeInTheDocument();
});

test('Doesnt render errors', () => {
  render(<Errors errors={{ duplicateKeys: [], invalidEndBalance: []}} />);
  expect(screen.queryByText(/Duplicate key errors:/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Incorrected end balance errors:/i)).not.toBeInTheDocument();
})