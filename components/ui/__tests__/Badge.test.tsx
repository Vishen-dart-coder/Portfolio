import { render, screen } from '@testing-library/react';
import Badge from '../Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies accent variant classes', () => {
    const { container } = render(<Badge variant="accent">Featured</Badge>);
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-accent-500/10', 'text-accent-400');
  });

  it('applies neutral variant classes', () => {
    const { container } = render(<Badge variant="neutral">Draft</Badge>);
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-neutral-700', 'text-neutral-300');
  });

  it('defaults to accent variant', () => {
    const { container } = render(<Badge>Default</Badge>);
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-accent-500/10', 'text-accent-400');
  });
});
