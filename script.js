// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Get saved theme or default to system preference
function getInitialTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Set theme
function setTheme(theme) {
  htmlElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Toggle theme
function toggleTheme() {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

// Initialize theme
setTheme(getInitialTheme());

// Theme toggle click handler
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}
// Smooth Scroll Navigation
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    // Only handle hash links
    if (href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        const mobileNav = document.getElementById('mobile-nav');
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        if (mobileNav && mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
          mobileToggle.classList.remove('active');
        }
        
        // Scroll to target
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update active state
        updateActiveNavLink();
      }
    }
  });
});
// Active Nav Link Highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Update active link on scroll
window.addEventListener('scroll', updateActiveNavLink);
// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (mobileMenuToggle && mobileNav) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });
}
// Header Scroll Shadow
const header = document.getElementById('header');

function updateHeaderShadow() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateHeaderShadow);
// GitHub API Integration
const GITHUB_USERNAME = 'Vishen-dart-coder';
const GITHUB_API_BASE = 'https://api.github.com';

// Fetch GitHub user data
async function fetchGitHubUserData() {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
    if (!response.ok) throw new Error('Failed to fetch user data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub user data:', error);
    return null;
  }
}

// Fetch GitHub repositories
async function fetchGitHubRepos() {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    if (!response.ok) throw new Error('Failed to fetch repos');
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

// Fetch contribution count (approximation using commits)
async function fetchContributionCount() {
  try {
    // Get repos and sum up commits (simplified approach)
    const repos = await fetchGitHubRepos();
    let totalCommits = 0;
    
    for (const repo of repos.slice(0, 10)) {
      const commitsResponse = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=1`);
      if (commitsResponse.ok) {
        const linkHeader = commitsResponse.headers.get('Link');
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (match) {
            totalCommits += parseInt(match[1]);
          }
        }
      }
    }
    
    return totalCommits;
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return 0;
  }
}
// Update Hero Metrics
async function updateHeroMetrics() {
  const reposCountElement = document.getElementById('repos-count');
  const contributionsCountElement = document.getElementById('contributions-count');
  
  try {
    // Fetch user data for repos count
    const userData = await fetchGitHubUserData();
    if (userData) {
      reposCountElement.textContent = `${userData.public_repos} Projects`;
    } else {
      reposCountElement.textContent = '30+ Projects';
    }
    
    // Fetch contributions (simplified)
    const contributions = await fetchContributionCount();
    if (contributions > 0) {
      contributionsCountElement.textContent = `${contributions}+ Contributions`;
    } else {
      contributionsCountElement.textContent = '500+ Contributions';
    }
  } catch (error) {
    console.error('Error updating hero metrics:', error);
    reposCountElement.textContent = '30+ Projects';
    contributionsCountElement.textContent = '500+ Contributions';
  }
}
// Language colors mapping
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  default: '#858585'
};

// Create project card HTML
function createProjectCard(repo) {
  const language = repo.language || 'Unknown';
  const languageColor = LANGUAGE_COLORS[language] || LANGUAGE_COLORS.default;
  
  return `
    <article class="project-card" onclick="window.open('${repo.html_url}', '_blank')">
      <div class="project-card-header">
        <h3>${repo.name}</h3>
      </div>
      <p>${repo.description || 'No description available'}</p>
      <div class="project-meta">
        ${repo.language ? `
          <span class="project-language">
            <span class="language-dot" style="background-color: ${languageColor}"></span>
            ${language}
          </span>
        ` : ''}
        <div class="project-stats">
          <span class="stat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
            </svg>
            ${repo.stargazers_count}
          </span>
          <span class="stat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 100-1.5.75.75 0 000 1.5zm6 0a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
            </svg>
            ${repo.forks_count}
          </span>
        </div>
      </div>
    </article>
  `;
}

// Render projects grid
async function renderProjectsGrid() {
  const projectsGrid = document.getElementById('projects-grid');
  
  try {
    const repos = await fetchGitHubRepos();
    
    if (repos.length > 0) {
      projectsGrid.innerHTML = repos.map(repo => createProjectCard(repo)).join('');
    } else {
      projectsGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Unable to load projects. Please visit my GitHub profile.</p>';
    }
  } catch (error) {
    console.error('Error rendering projects:', error);
    projectsGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Unable to load projects. Please visit my GitHub profile.</p>';
  }
}
// Initialize GitHub data when page loads
document.addEventListener('DOMContentLoaded', () => {
  updateHeroMetrics();
  renderProjectsGrid();
});
// Contact Form Handler
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:iamvishensharma@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Optional: Reset form
    contactForm.reset();
  });
}
// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

function updateBackToTopButton() {
  if (window.scrollY > 500) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

if (backToTopButton) {
  window.addEventListener('scroll', updateBackToTopButton);
  backToTopButton.addEventListener('click', scrollToTop);
}
// Scroll Reveal Animations
function revealOnScroll() {
  const reveals = document.querySelectorAll('.featured-card, .project-card, .skills-category');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 100;
    
    if (elementTop < windowHeight - revealPoint) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

// Initialize reveal elements
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.featured-card, .project-card, .skills-category');
  revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
  });
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
});
