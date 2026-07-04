const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function scrollToTarget(target) {
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// Nav links: smooth scroll + close mobile menu
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    mobileNav?.classList.remove('active');
    mobileMenuToggle?.classList.remove('active');
    scrollToTarget(target);
  });
});

// Mobile menu
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
mobileMenuToggle?.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  mobileNav.classList.toggle('active');
});

// Header shadow + back-to-top (single rAF-throttled handler)
const header = document.getElementById('header');
const backToTopButton = document.getElementById('back-to-top');
let scrollTicking = false;
function onScrollFrame() {
  header.classList.toggle('scrolled', window.scrollY > 50);
  backToTopButton?.classList.toggle('visible', window.scrollY > 500);
  scrollTicking = false;
}
document.addEventListener('scroll', () => {
  if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(onScrollFrame); }
}, { passive: true });

backToTopButton?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Active nav highlighting via IntersectionObserver
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

// GitHub API
const GITHUB_USERNAME = 'Vishen-dart-coder';
const GITHUB_API_BASE = 'https://api.github.com';

async function fetchGitHubRepos() {
  try {
    const res = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    if (!res.ok) throw new Error('repos fetch failed');
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Real stats for the stats strip
async function updateStats() {
  try {
    const res = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
    if (!res.ok) return;
    const user = await res.json();
    const reposStat = document.querySelector('.stat-number[data-stat="repos"]');
    if (reposStat && user.public_repos) reposStat.dataset.count = user.public_repos;
  } catch (err) {
    console.error(err);
  }
}

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219',
  Go: '#00ADD8', Rust: '#dea584', default: '#858585'
};

function createProjectCard(repo) {
  const language = repo.language || 'Unknown';
  const languageColor = LANGUAGE_COLORS[language] || LANGUAGE_COLORS.default;
  return `
    <article class="project-card" onclick="window.open('${repo.html_url}', '_blank')">
      <div class="card-core">
      <div class="project-card-image">
        <img src="https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}" alt="${repo.name} preview" loading="lazy">
      </div>
      <h3>${repo.name}</h3>
      <p>${repo.description || 'No description available'}</p>
      <div class="project-meta">
        ${repo.language ? `
          <span class="project-language">
            <span class="language-dot" style="background-color: ${languageColor}"></span>
            ${language}
          </span>` : ''}
        <div class="project-stats">
          <span class="stat">&#9733; ${repo.stargazers_count}</span>
          <span class="stat">&#8916; ${repo.forks_count}</span>
        </div>
      </div>
      </div>
    </article>`;
}

async function renderProjectsGrid() {
  const grid = document.getElementById('projects-grid');
  const repos = await fetchGitHubRepos();
  grid.innerHTML = repos.length
    ? repos.map(createProjectCard).join('')
    : '<p style="padding: 40px 0;">Unable to load projects. Please visit my GitHub profile.</p>';
}

// Carousel arrows
document.querySelectorAll('.carousel-wrap').forEach(wrap => {
  const track = wrap.querySelector('.projects-carousel');
  wrap.querySelector('.carousel-prev')?.addEventListener('click', () =>
    track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' }));
  wrap.querySelector('.carousel-next')?.addEventListener('click', () =>
    track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' }));
});

// Contact form (primary contact path) with button feedback
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Opening your email app...';
  window.location.href = `mailto:iamvishensharma@gmail.com?subject=${subject}&body=${body}`;

  setTimeout(() => {
    btn.textContent = 'Done! Check your email app';
    contactForm.reset();
    setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 3000);
  }, 800);
});

// Single scroll-reveal system (IntersectionObserver)
function initScrollReveal() {
  const els = document.querySelectorAll('.featured-card, .skills-category, .about-text, .contact-form');
  if (reduceMotion) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => { el.classList.add('scroll-reveal'); observer.observe(el); });
}

// Count-up stats
function initStatsCountUp() {
  const numbers = document.querySelectorAll('.stat-number[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      observer.unobserve(el);
      const target = parseInt(el.dataset.count, 10);
      if (reduceMotion) { el.textContent = target; return; }
      const start = performance.now();
      (function tick(now) {
        const p = Math.min((now - start) / 1400, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    });
  }, { threshold: 0.5 });
  numbers.forEach(el => observer.observe(el));
}

// Typewriter with caret for contact heading
function initTypewriter() {
  const heading = document.querySelector('.typewriter');
  if (!heading) return;
  const target = heading.querySelector('.type-target');
  const text = heading.dataset.text;
  if (reduceMotion) { target.textContent = text; return; }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(heading);
      let i = 0;
      (function type() {
        target.textContent = text.slice(0, ++i);
        if (i < text.length) setTimeout(type, 55 + Math.random() * 45);
      })();
    });
  }, { threshold: 0.6 });
  observer.observe(heading);
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjectsGrid();
  updateStats();
  initScrollReveal();
  initStatsCountUp();
  initTypewriter();
});
