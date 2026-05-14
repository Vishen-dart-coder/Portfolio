// ============================================
// Loading Animation
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Remove loading class to trigger fade-in
  document.body.classList.remove('loading');
});

// ============================================
// Dark Mode Toggle
// ============================================

const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update ARIA label
    const isDark = newTheme === 'dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Toggle light mode' : 'Toggle dark mode');
    themeToggle.setAttribute('title', isDark ? 'Toggle light mode' : 'Toggle dark mode');
  });

  // Set initial ARIA label
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const isDark = currentTheme === 'dark';
  themeToggle.setAttribute('aria-label', isDark ? 'Toggle light mode' : 'Toggle dark mode');
  themeToggle.setAttribute('title', isDark ? 'Toggle light mode' : 'Toggle dark mode');
}

// ============================================
// Back to Top Button
// ============================================

const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  // Scroll to top on click
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// Scroll Down Indicator Auto-Show
// ============================================

const scrollDownIndicator = document.querySelector('.scroll-down');
let scrollDownTimer;
let currentSection = null;

// Show scroll down indicator after user stays in a section for 3 seconds
function startScrollDownTimer() {
  clearTimeout(scrollDownTimer);
  scrollDownTimer = setTimeout(() => {
    if (scrollDownIndicator && window.pageYOffset < 500) {
      scrollDownIndicator.classList.add('visible');
    }
  }, 3000);
}

// Hide scroll down indicator when user scrolls
window.addEventListener('scroll', () => {
  if (scrollDownIndicator) {
    if (window.pageYOffset > 100) {
      scrollDownIndicator.classList.remove('visible');
      clearTimeout(scrollDownTimer);
    } else {
      // Restart timer when at top
      startScrollDownTimer();
    }
  }
});

// Start timer on page load
startScrollDownTimer();

// ============================================
// Parallax Scrolling
// ============================================

let parallaxTicking = false;

// Only run parallax on desktop and if motion is allowed
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.innerWidth < 768;

if (!prefersReducedMotion && !isMobile) {
  window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');

        parallaxElements.forEach(el => {
          const speed = parseFloat(el.dataset.speed) || 0.5;
          el.style.transform = `translateY(${scrolled * speed}px)`;
        });

        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  });
}

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// ============================================
// Header Scroll Effect
// ============================================

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============================================
// Active Navigation State
// ============================================

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
  threshold: 0.5,
  rootMargin: '-80px 0px 0px 0px' // Offset for fixed header
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');

      // Remove active class from all links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });

      // Add active class to matching link
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

// ============================================
// GitHub API Integration
// ============================================

const GITHUB_USERNAME = 'Vishen-dart-coder';

// Fetch GitHub user data
async function fetchGitHubData() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!response.ok) throw new Error('Failed to fetch GitHub data');

    const data = await response.json();
    return {
      name: data.name,
      bio: data.bio,
      avatar: data.avatar_url,
      followers: data.followers,
      repos: data.public_repos
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return null;
  }
}

// Fetch GitHub statistics
async function fetchGitHubStats() {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`)
    ]);

    if (!userResponse.ok || !reposResponse.ok) throw new Error('Failed to fetch GitHub stats');

    const userData = await userResponse.json();
    const repos = await reposResponse.json();

    // Calculate total stars and forks
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

    // Find top language
    const languageCounts = {};
    repos.forEach(repo => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });
    const topLanguage = Object.keys(languageCounts).reduce((a, b) =>
      languageCounts[a] > languageCounts[b] ? a : b, 'N/A'
    );

    return {
      totalStars,
      totalForks,
      publicRepos: userData.public_repos,
      topLanguage
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}

// Update hero metrics
function updateHeroMetrics(userData) {
  const reposCount = document.getElementById('repos-count');
  const contributionsCount = document.getElementById('contributions-count');

  if (userData && userData.repos) {
    if (reposCount) reposCount.textContent = `${userData.repos} Repos`;
  } else {
    if (reposCount) reposCount.textContent = 'Repos: N/A';
  }

  // Contributions are not directly available via GitHub API without authentication
  // Using placeholder for now
  if (contributionsCount) contributionsCount.textContent = '1000+ Contributions';
}

// Update GitHub stats section
function updateGitHubStats(stats) {
  const totalStarsEl = document.getElementById('total-stars');
  const totalForksEl = document.getElementById('total-forks');
  const publicReposEl = document.getElementById('public-repos');
  const topLanguageEl = document.getElementById('top-language');

  if (stats) {
    if (totalStarsEl) totalStarsEl.textContent = stats.totalStars;
    if (totalForksEl) totalForksEl.textContent = stats.totalForks;
    if (publicReposEl) publicReposEl.textContent = stats.publicRepos;
    if (topLanguageEl) topLanguageEl.textContent = stats.topLanguage;
  } else {
    if (totalStarsEl) totalStarsEl.textContent = 'N/A';
    if (totalForksEl) totalForksEl.textContent = 'N/A';
    if (publicReposEl) publicReposEl.textContent = 'N/A';
    if (topLanguageEl) topLanguageEl.textContent = 'N/A';
  }
}

// Fetch repositories
async function fetchRepositories() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`);
    if (!response.ok) throw new Error('Failed to fetch repositories');

    const repos = await response.json();
    return repos.map(repo => ({
      name: repo.name,
      description: repo.description || 'No description available',
      url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stars: repo.stargazers_count
    }));
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

// Render project cards
function renderProjects(repos) {
  const container = document.getElementById('projects-grid');

  if (repos.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--color-secondary);">Failed to load projects. Please try again later.</p>';
    return;
  }

  container.innerHTML = repos.map(repo => `
    <article class="project-card">
      <h3>${repo.name}</h3>
      <p>${repo.description}</p>
      <div class="metadata">
        ${repo.language ? `<span class="language">${repo.language}</span>` : ''}
        <span class="stars">★ ${repo.stars}</span>
        <div class="project-links">
          ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener" class="project-link-button">View Live</a>` : ''}
          <a href="${repo.url}" target="_blank" rel="noopener" class="project-link-button">View Code</a>
        </div>
      </div>
    </article>
  `).join('');
}

// Update profile photo
function updateProfilePhoto(avatarUrl) {
  const profilePhoto = document.getElementById('profile-photo');
  if (profilePhoto && avatarUrl) {
    profilePhoto.src = avatarUrl;
  }
}

// Initialize GitHub data
async function initGitHub() {
  // Fetch and update profile photo
  const userData = await fetchGitHubData();
  if (userData && userData.avatar) {
    updateProfilePhoto(userData.avatar);
  }

  // Update hero metrics
  updateHeroMetrics(userData);

  // Fetch and update GitHub stats
  const stats = await fetchGitHubStats();
  updateGitHubStats(stats);

  // Fetch and render projects
  const repos = await fetchRepositories();
  renderProjects(repos);
}

// Call on page load
initGitHub();

// ============================================
// Scroll Reveal Animations
// ============================================

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target); // Only animate once
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});
