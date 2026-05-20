export const BRAND_TOKENS = {
  colors: {
    primaryAccent: '#2E7D32',
    accentHover: '#4CAF50',
    surfaceTint: '#F9F9F6',
    ink: '#111315',
    mutedInk: '#5C6166',
  },
  fonts: {
    display: 'var(--font-space-grotesk)',
    body: 'var(--font-plus-jakarta-sans)',
  },
} as const;

export type BrandTokens = typeof BRAND_TOKENS;
