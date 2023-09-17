import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '.';

test('renders learn react link', () => {
  render(<Dashboard />);
  const linkElement = screen.getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
