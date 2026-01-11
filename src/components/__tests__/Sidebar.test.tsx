import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar } from '../Sidebar';

type Month = {
  year: number;
  month: number;
};

describe('Sidebar', () => {
  const mockCategories = ['Technology', 'Life'];

  const mockMonths: Month[] = [
    { year: 2024, month: 1 },
    { year: 2024, month: 2 },
  ];

  it('renders sidebar container', () => {
    render(<Sidebar categories={mockCategories} months={mockMonths} />);

    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toBeTruthy();
  });

  it('displays categories section', () => {
    render(<Sidebar categories={mockCategories} months={mockMonths} />);

    expect(screen.getByText('カテゴリ')).toBeTruthy();
    expect(screen.getByText('Technology')).toBeTruthy();
    expect(screen.getByText('Life')).toBeTruthy();
  });

  it('displays archive section with months', () => {
    render(<Sidebar categories={mockCategories} months={mockMonths} />);

    expect(screen.getByText('アーカイブ')).toBeTruthy();
    expect(screen.getByText('2024年1月')).toBeTruthy();
    expect(screen.getByText('2024年2月')).toBeTruthy();
  });

  it('creates correct category links', () => {
    render(<Sidebar categories={mockCategories} months={mockMonths} />);

    const technologyLink = screen.getByRole('link', { name: /technology/i });
    const lifeLink = screen.getByRole('link', { name: /life/i });

    expect(technologyLink).toHaveAttribute('href', '/categories/Technology');
    expect(lifeLink).toHaveAttribute('href', '/categories/Life');
  });

  it('creates correct archive links', () => {
    render(<Sidebar categories={mockCategories} months={mockMonths} />);

    const januaryLink = screen.getByRole('link', { name: /2024年1月/i });
    const februaryLink = screen.getByRole('link', { name: /2024年2月/i });

    expect(januaryLink).toHaveAttribute('href', '/archive/2024/01');
    expect(februaryLink).toHaveAttribute('href', '/archive/2024/02');
  });

  it('does not render categories section when empty', () => {
    render(<Sidebar categories={[]} months={mockMonths} />);

    expect(screen.queryByText('カテゴリ')).toBeNull();
  });

  it('does not render archive section when empty', () => {
    render(<Sidebar categories={mockCategories} months={[]} />);

    expect(screen.queryByText('アーカイブ')).toBeNull();
  });
});
