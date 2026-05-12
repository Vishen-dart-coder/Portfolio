import { cn, formatDate, calculateReadingTime } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn - Class Name Merger', () => {
    it('should merge simple class names', () => {
      expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
    });

    it('should handle conditional classes', () => {
      expect(cn('px-2', undefined, 'py-1')).toBe('px-2 py-1');
      expect(cn('px-2', null, 'py-1')).toBe('px-2 py-1');
      expect(cn('px-2', false && 'hidden', 'py-1')).toBe('px-2 py-1');
    });

    it('should resolve Tailwind conflicts', () => {
      expect(cn('p-2', 'p-4')).toBe('p-4');
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
      expect(cn('text-sm', 'text-lg')).toBe('text-lg');
    });

    it('should handle arrays', () => {
      expect(cn(['px-2', 'py-1'], 'mx-2')).toBe('px-2 py-1 mx-2');
    });

    it('should handle objects', () => {
      expect(cn({ 'px-2': true, 'py-1': false }, 'mx-2')).toBe('px-2 mx-2');
      expect(cn({ 'px-2': true, 'py-1': true })).toBe('px-2 py-1');
    });

    it('should return empty string for empty input', () => {
      expect(cn()).toBe('');
      expect(cn('', '', '')).toBe('');
    });
  });

  describe('formatDate - Date Formatter', () => {
    it('should format date to "MMM dd, yyyy" format', () => {
      const date = new Date('2024-05-12');
      expect(formatDate(date)).toBe('May 12, 2024');
    });

    it('should format date string to "MMM dd, yyyy" format', () => {
      expect(formatDate('2024-05-12')).toBe('May 12, 2024');
    });

    it('should handle different dates correctly', () => {
      expect(formatDate(new Date('2024-01-01'))).toBe('Jan 01, 2024');
      expect(formatDate(new Date('2024-12-25'))).toBe('Dec 25, 2024');
    });

    it('should handle single digit days and months with leading zeros', () => {
      const date = new Date('2024-03-05');
      const formatted = formatDate(date);
      expect(formatted).toBe('Mar 05, 2024');
    });

    it('should throw error for invalid date strings', () => {
      expect(() => formatDate('invalid-date')).toThrow();
    });
  });

  describe('calculateReadingTime - Reading Time Calculator', () => {
    it('should calculate reading time for text (200 words per minute)', () => {
      const text = 'word '.repeat(200); // 200 words
      expect(calculateReadingTime(text)).toBe(1);
    });

    it('should round up reading time', () => {
      const text = 'word '.repeat(150); // 150 words
      expect(calculateReadingTime(text)).toBe(1);
    });

    it('should handle short text', () => {
      const text = 'short text';
      expect(calculateReadingTime(text)).toBe(1);
    });

    it('should calculate reading time for longer texts', () => {
      const text = 'word '.repeat(400); // 400 words
      expect(calculateReadingTime(text)).toBe(2);
    });

    it('should calculate reading time for very long texts', () => {
      const text = 'word '.repeat(1000); // 1000 words
      expect(calculateReadingTime(text)).toBe(5);
    });

    it('should handle empty string', () => {
      expect(calculateReadingTime('')).toBe(0);
    });

    it('should handle text with multiple spaces', () => {
      const text = 'word   '.repeat(200); // Extra spaces, still 200 words
      expect(calculateReadingTime(text)).toBe(1);
    });

    it('should handle text with newlines', () => {
      const text = 'word\n'.repeat(200); // 200 words with newlines
      expect(calculateReadingTime(text)).toBe(1);
    });
  });
});
