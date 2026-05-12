export const tokens = {
  colors: {
    background: '#F8F7F4',    // Warm neutral
    surface: '#FFFFFF',        // Pure white
    primary: '#111111',        // Near black
    secondary: '#5F5F5F',      // Medium gray
    border: '#E7E5E4',         // Subtle border
    accent: '#166534',         // Forest green
  },

  typography: {
    fontFamily: {
      ui: 'var(--font-geist-sans)',
      serif: 'var(--font-source-serif)',
    },
    scale: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      '7xl': '4.5rem',   // 72px
    },
  },

  spacing: {
    section: '10rem',      // 160px
    container: '1280px',
    gutter: '2rem',
  },

  animation: {
    duration: {
      fast: '200ms',
      normal: '400ms',
      slow: '600ms',
      slower: '1000ms',
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
  },
} as const;
