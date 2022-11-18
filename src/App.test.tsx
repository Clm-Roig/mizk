import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('NotFound', () => {
  it('Renders not found on an invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/an/invalid/path']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Not Found'
    );
  });
});
