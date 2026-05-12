import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies hover classes when hover is true', () => {
    const { container } = render(<Card hover>Hoverable card</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('hover:border-accent-500');
  });

  it('does not apply hover classes when hover is false', () => {
    const { container } = render(<Card hover={false}>Non-hoverable card</Card>);
    const card = container.firstChild;
    expect(card).not.toHaveClass('hover:border-accent-500');
  });

  it('merges custom className', () => {
    const { container } = render(<Card className="custom-class">Custom card</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('custom-class');
    expect(card).toHaveClass('bg-neutral-900'); // base class
  });
});
