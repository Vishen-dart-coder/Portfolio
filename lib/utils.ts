import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with conflict resolution
 * @param inputs - Class names as strings, arrays, or objects
 * @returns Merged class name string with Tailwind conflicts resolved
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date to "MMM dd, yyyy" format
 * @param date - Date object or date string
 * @returns Formatted date string (e.g., "May 12, 2024")
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    throw new Error(`Invalid date: ${date}`);
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };

  return dateObj.toLocaleDateString('en-US', options);
}

/**
 * Calculates estimated reading time based on word count
 * Assumes 200 words per minute average reading speed
 * @param text - Text content to analyze
 * @returns Estimated reading time in minutes (minimum 1)
 */
export function calculateReadingTime(text: string): number {
  if (!text) {
    return 0;
  }

  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return readingTime;
}
