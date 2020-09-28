module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.jsx',
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      spacing: {
        96: '24rem',
        128: '30rem',
      },
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        typing: 'var(--color-bg-typing)',
        input: 'var(--color-bg-input)',
        redo: 'var(--color-bg-redo)',
      },
      textColor: {
        header: 'var(--color-text-header)',
        typing: 'var(--color-text-typing)',
        inverse: 'var(--color-text-inverse)',
        current: 'var(--color-text-current)',
        correct: 'var(--color-text-correct)',
        wrong: 'var(--color-text-wrong)',
        stats: 'var(--color-text-stats)',
        nav: 'var(--color-text-nav)',
        redo: 'var(--color-text-redo)',
        display: 'var(--color-text-display)',
      },
      placeholderColor: {
        input: 'var(--color-placeholder-input)',
      },
      borderColor: {
        primary: 'var(--color-border-primary)',
      },
    },
  },
  variants: {},
  plugins: [],
};
