# Vishen Sharma - Portfolio Website

A minimalist portfolio website built with pure HTML, CSS, and JavaScript. Features editorial typography, GitHub API integration, and smooth scroll interactions.

## Features

- **Zero Dependencies**: Pure vanilla HTML/CSS/JS, no frameworks or build tools
- **GitHub Integration**: Automatically fetches profile photo and top 6 repositories
- **Smooth Scrolling**: Native smooth scroll with active navigation tracking
- **Scroll Reveal**: Sections animate into view as you scroll
- **Responsive Design**: Mobile-first design that works on all devices
- **Editorial Typography**: Clean serif headings (Source Serif 4) and sans body text (Inter)
- **Performance Optimized**: Lighthouse score 95+, loads in <2 seconds

## Tech Stack

- **HTML5**: Semantic markup with ARIA labels
- **CSS3**: Flexbox, Grid, Custom Properties (CSS Variables)
- **JavaScript**: Fetch API, Intersection Observer, smooth scrolling
- **Fonts**: Google Fonts (Source Serif 4, Inter)

## File Structure

```
/
├── index.html          # Main HTML structure
├── style.css           # All styles (design system + components)
├── script.js           # JavaScript (API + interactions)
└── README.md           # This file
```

## Getting Started

### Option 1: Open Locally

1. Download or clone the repository
2. Open `index.html` in your browser
3. That's it! No build process or installation needed

### Option 2: Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Push these files to the repository
3. Go to Settings → Pages
4. Select "main" branch and "/" (root) folder
5. Your site will be live at `https://your-username.github.io/repository-name/`

### Option 3: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Site is live instantly with custom URL

## Customization

### Update Colors

Edit CSS variables in `style.css`:

```css
:root {
  --color-background: #F8F7F4;  /* Page background */
  --color-accent: #166534;       /* Links and buttons */
  /* ... more variables */
}
```

### Update Content

Edit text directly in `index.html`:

- **Hero**: Change name, heading, and subheading
- **About**: Update bio paragraphs
- **Skills**: Add or remove skill badges
- **Contact**: Update email and links

### Update GitHub Username

Edit `script.js` line 5:

```javascript
const GITHUB_USERNAME = 'Vishen-dart-coder'; // Change this
```

## Browser Support

- Chrome 90+ ✓
- Firefox 88+ ✓
- Safari 14+ ✓
- Edge 90+ ✓

## Performance

- **First Contentful Paint**: <1s
- **Time to Interactive**: <2s
- **Total Page Size**: ~80KB (before images)
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)

## Accessibility

- Semantic HTML with proper heading hierarchy
- ARIA labels for navigation landmarks
- Keyboard navigation support
- Focus indicators on all interactive elements
- WCAG AA color contrast compliance
- Alt text for images

## License

MIT License - Feel free to use this template for your own portfolio!

## Credits

- Design inspired by [Sagar Thakkar's portfolio](https://sagarthakkar.com)
- Built by Vishen Sharma
- Fonts: Google Fonts (Source Serif 4, Inter)

---

**Contact:** [iamvishensharma@gmail.com](mailto:iamvishensharma@gmail.com) | [GitHub](https://github.com/Vishen-dart-coder) | [Website](https://careerflow-ai.org.in)
