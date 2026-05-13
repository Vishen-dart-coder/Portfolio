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
        <a href="${repo.url}" target="_blank" rel="noopener">View →</a>
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
