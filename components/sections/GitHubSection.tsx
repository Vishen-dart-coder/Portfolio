import { getGitHubData, getPinnedRepos } from '@/lib/github';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default async function GitHubSection() {
  const [githubDataResult, pinnedRepos] = await Promise.all([
    getGitHubData(),
    getPinnedRepos(),
  ]);

  const stats = githubDataResult.stats;

  const topLanguages = Object.entries(stats.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <section id="github" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-sm uppercase tracking-wide text-neutral-400 mb-2">
            GitHub Activity
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Open Source Contributions
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {stats.totalRepos}
              </div>
              <div className="text-sm text-neutral-400">Repositories</div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {stats.totalStars}
              </div>
              <div className="text-sm text-neutral-400">Stars</div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {stats.totalForks}
              </div>
              <div className="text-sm text-neutral-400">Forks</div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {stats.contributions.length}
              </div>
              <div className="text-sm text-neutral-400">Recent Activity</div>
            </div>
          </Card>
        </div>

        {/* Top Languages */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif font-semibold text-white mb-6">
            Most Used Languages
          </h3>
          <div className="flex flex-wrap gap-3">
            {topLanguages.length > 0 ? (
              topLanguages.map(([language, count]) => (
                <Badge key={language} variant="neutral">
                  {language} ({count})
                </Badge>
              ))
            ) : (
              <p className="text-neutral-400">No language data available</p>
            )}
          </div>
        </div>

        {/* Pinned Repositories */}
        <div>
          <h3 className="text-2xl font-serif font-semibold text-white mb-6">
            Pinned Repositories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pinnedRepos.length > 0 ? (
              pinnedRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card hover>
                    <div className="mb-3">
                      <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-accent-400 transition-colors">
                        {repo.name}
                      </h4>
                      <p className="text-sm text-neutral-400 line-clamp-2">
                        {repo.description || 'No description available'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="neutral">
                        {repo.language || 'Unknown'}
                      </Badge>
                      <div className="flex items-center gap-4 text-sm text-neutral-400">
                        <span>⭐ {repo.stargazers_count}</span>
                        <span>🍴 {repo.forks_count}</span>
                      </div>
                    </div>
                  </Card>
                </a>
              ))
            ) : (
              <p className="text-neutral-400">No repositories available</p>
            )}
          </div>
        </div>

        {/* View on GitHub CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/Vishen-dart-coder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 transition-colors font-medium"
          >
            View Full Profile on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
