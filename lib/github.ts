import { Octokit as OctokitClass } from 'octokit';
import { cache } from 'react';

const USERNAME = 'Vishen-dart-coder';

// Initialize Octokit with optional token
const octokit = new OctokitClass({
  auth: process.env.GITHUB_TOKEN || undefined,
});

// Types
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  homepage: string | null;
  created_at: string;
  updated_at: string;
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  languages: Record<string, number>;
  contributions: ContributionData[];
}

export interface ContributionData {
  date: string;
  type: string;
  repo: string;
}

export interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
}

// Calculate statistics from repos and events
export function calculateStats(
  repos: GitHubRepo[],
  events: GitHubEvent[]
): GitHubStats {
  const stats: GitHubStats = {
    totalStars: 0,
    totalForks: 0,
    totalRepos: repos.length,
    languages: {},
    contributions: formatContributionData(events),
  };

  repos.forEach((repo) => {
    stats.totalStars += repo.stargazers_count;
    stats.totalForks += repo.forks_count;

    if (repo.language) {
      stats.languages[repo.language] = (stats.languages[repo.language] || 0) + 1;
    }
  });

  return stats;
}

// Format GitHub events into contribution data
export function formatContributionData(events: GitHubEvent[]): ContributionData[] {
  return events.map((event) => ({
    date: event.created_at,
    type: event.type,
    repo: event.repo.name,
  }));
}

// Fetch all GitHub data with caching
export const getGitHubData = cache(async (): Promise<{
  repos: GitHubRepo[];
  stats: GitHubStats;
}> => {
  try {
    // Fetch user's repositories
    const { data: repos } = await octokit.rest.repos.listForUser({
      username: USERNAME,
      sort: 'updated',
      per_page: 100,
    });

    // Fetch user's recent events
    const { data: events } = await octokit.rest.activity.listPublicEventsForUser({
      username: USERNAME,
      per_page: 100,
    });

    // Calculate stats
    const stats = calculateStats(repos as GitHubRepo[], events as GitHubEvent[]);

    return {
      repos: repos as GitHubRepo[],
      stats,
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);

    // Return fallback data on error
    return {
      repos: [],
      stats: {
        totalStars: 0,
        totalForks: 0,
        totalRepos: 0,
        languages: {},
        contributions: [],
      },
    };
  }
});

// Fetch top 6 repositories by stars (pinned repos)
export const getPinnedRepos = cache(async (): Promise<GitHubRepo[]> => {
  try {
    const { data: repos } = await octokit.rest.repos.listForUser({
      username: USERNAME,
      sort: 'updated',
      per_page: 100,
    });

    // Sort by stars and get top 6
    return (repos as GitHubRepo[])
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);
  } catch (error) {
    console.error('Error fetching pinned repos:', error);
    return [];
  }
});
