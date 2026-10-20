import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Header } from '../../src/components/layout/Header';

describe('Header', () => {
  it('lista as seções na ordem combinada', () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    const names = screen.getAllByRole('link').map((l) => l.textContent).filter((t) => t && !t.includes('agenda'));
    expect(names).toEqual(['Início', 'Sobre', 'Agenda', 'História', 'Mídias', 'Integrantes', 'Contato']);
  });
  it('abre e fecha o menu no celular', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Header /></MemoryRouter>);
    const toggle = screen.getByRole('button', { name: 'Menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(screen.getByRole('button', { name: 'Fechar' })).toHaveAttribute('aria-expanded', 'true');
  });
});
