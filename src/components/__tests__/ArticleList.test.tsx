import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArticleList } from '../ArticleList';
import type { BlogPostMetadata } from '@/types/blog';

describe('ArticleList', () => {
  const mockArticles: BlogPostMetadata[] = [
    {
      slug: 'first-post',
      title: 'First Post',
      date: '2024-01-15',
      category: 'Technology',
      excerpt: 'This is the first post excerpt.',
    },
    {
      slug: 'second-post',
      title: 'Second Post',
      date: '2024-01-20',
      category: 'Life',
      excerpt: 'This is the second post excerpt.',
    },
  ];

  it('renders article list with correct articles', () => {
    render(<ArticleList articles={mockArticles} />);

    expect(screen.getByText('First Post')).toBeTruthy();
    expect(screen.getByText('Second Post')).toBeTruthy();
  });

  it('displays article excerpts', () => {
    render(<ArticleList articles={mockArticles} />);

    expect(screen.getByText('This is the first post excerpt.')).toBeTruthy();
    expect(screen.getByText('This is the second post excerpt.')).toBeTruthy();
  });

  it('displays article metadata', () => {
    render(<ArticleList articles={mockArticles} />);

    expect(screen.getByText('Technology')).toBeTruthy();
    expect(screen.getByText('Life')).toBeTruthy();
    // Date format is localized to ja-JP in the component
    expect(screen.getByText('2024/1/15')).toBeTruthy();
    expect(screen.getByText('2024/1/20')).toBeTruthy();
  });

  it('renders article links', () => {
    render(<ArticleList articles={mockArticles} />);

    const firstLink = screen.getByRole('link', { name: /first post/i });
    const secondLink = screen.getByRole('link', { name: /second post/i });

    expect(firstLink).toHaveAttribute('href', '/articles/first-post');
    expect(secondLink).toHaveAttribute('href', '/articles/second-post');
  });

  it('renders empty message when no articles provided', () => {
    render(<ArticleList articles={[]} />);

    expect(screen.getByText('記事がまだ投稿されていません。')).toBeTruthy();
  });

  it('renders with optional title', () => {
    render(<ArticleList articles={mockArticles} title="Recent Articles" />);

    expect(screen.getByText('Recent Articles')).toBeTruthy();
  });
});
