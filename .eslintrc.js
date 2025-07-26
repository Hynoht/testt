module.exports = {
    extends: ['next', 'next/core-web-vitals'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-html-link-for-pages': 'off', // si tu veux garder temporairement <a>
    },
  }
  