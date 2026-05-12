import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';
import Textarea from '../Textarea';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('handles user input', () => {
    render(<Input label="Name" />);
    const input = screen.getByLabelText('Name') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'John Doe' } });
    expect(input.value).toBe('John Doe');
  });

  it('applies error border when error exists', () => {
    render(<Input label="Email" error="Invalid" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveClass('border-red-500');
  });
});

describe('Textarea', () => {
  it('renders with label', () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Textarea label="Bio" error="Too long" />);
    expect(screen.getByText('Too long')).toBeInTheDocument();
  });

  it('handles user input', () => {
    render(<Textarea label="Description" />);
    const textarea = screen.getByLabelText('Description') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'Test content' } });
    expect(textarea.value).toBe('Test content');
  });

  it('applies error border when error exists', () => {
    render(<Textarea label="Comment" error="Required" />);
    const textarea = screen.getByLabelText('Comment');
    expect(textarea).toHaveClass('border-red-500');
  });
});
