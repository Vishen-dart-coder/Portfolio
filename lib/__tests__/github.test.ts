// lib/__tests__/github.test.ts
// Mock the octokit module before importing
jest.mock('octokit', () => ({
  Octokit: jest.fn(),
}));

// Mock React cache
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  cache: (fn: any) => fn,
}));

import { calculateStats, formatContributionData } from '../github';

describe('GitHub utilities', () => {
  describe('calculateStats', () => {
    it('should calculate total stars correctly', () => {
      const repos = [
        { stargazers_count: 10, forks_count: 2, language: 'TypeScript' },
        { stargazers_count: 5, forks_count: 1, language: 'JavaScript' },
      ];

      const stats = calculateStats(repos as any, []);
      expect(stats.totalStars).toBe(15);
    });

    it('should calculate total forks correctly', () => {
      const repos = [
        { stargazers_count: 10, forks_count: 2, language: 'TypeScript' },
        { stargazers_count: 5, forks_count: 1, language: 'JavaScript' },
      ];

      const stats = calculateStats(repos as any, []);
      expect(stats.totalForks).toBe(3);
    });

    it('should count repositories correctly', () => {
      const repos = [
        { stargazers_count: 10, forks_count: 2, language: 'TypeScript' },
        { stargazers_count: 5, forks_count: 1, language: 'JavaScript' },
      ];

      const stats = calculateStats(repos as any, []);
      expect(stats.totalRepos).toBe(2);
    });

    it('should aggregate languages correctly', () => {
      const repos = [
        { stargazers_count: 10, forks_count: 2, language: 'TypeScript' },
        { stargazers_count: 5, forks_count: 1, language: 'TypeScript' },
        { stargazers_count: 3, forks_count: 0, language: 'JavaScript' },
      ];

      const stats = calculateStats(repos as any, []);
      expect(stats.languages).toEqual({
        TypeScript: 2,
        JavaScript: 1,
      });
    });

    it('should handle repos without language', () => {
      const repos = [
        { stargazers_count: 10, forks_count: 2, language: null },
        { stargazers_count: 5, forks_count: 1, language: 'TypeScript' },
      ];

      const stats = calculateStats(repos as any, []);
      expect(stats.languages.TypeScript).toBe(1);
      expect(stats.languages.null).toBeUndefined();
    });
  });

  describe('formatContributionData', () => {
    it('should format events into contribution data', () => {
      const events = [
        {
          type: 'PushEvent',
          created_at: '2026-05-12T10:00:00Z',
          repo: { name: 'user/repo1' },
        },
        {
          type: 'PullRequestEvent',
          created_at: '2026-05-12T11:00:00Z',
          repo: { name: 'user/repo2' },
        },
      ];

      const contributions = formatContributionData(events as any);
      expect(contributions).toHaveLength(2);
      expect(contributions[0].type).toBe('PushEvent');
      expect(contributions[0].repo).toBe('user/repo1');
    });
  });
});
