/**
 * Fluent UI Theme Configuration (Azure Portal Style)
 */

import {
  webLightTheme,
  webDarkTheme,
  Theme,
  createLightTheme,
  createDarkTheme,
  BrandVariants,
} from '@fluentui/react-components';

// Azure Portal brand colors
const nababBrandVariants: BrandVariants = {
  10: '#020305',
  20: '#111723',
  30: '#16263D',
  40: '#193253',
  50: '#1B3F6A',
  60: '#1C4C82',
  70: '#1B599B',
  80: '#1767B5',
  90: '#0078D4', // Primary brand color (Azure blue)
  100: '#1A86D9',
  110: '#3595DE',
  120: '#4FA3E3',
  130: '#68B2E8',
  140: '#81C1ED',
  150: '#9AD0F2',
  160: '#B3DFF7',
};

// Create custom light theme
export const nababLightTheme: Theme = {
  ...webLightTheme,
  ...createLightTheme(nababBrandVariants),
};

// Create custom dark theme
export const nababDarkTheme: Theme = {
  ...webDarkTheme,
  ...createDarkTheme(nababBrandVariants),
};

// Theme mode type
export type ThemeMode = 'light' | 'dark';

// Get theme based on mode
export const getTheme = (mode: ThemeMode): Theme => {
  return mode === 'dark' ? nababDarkTheme : nababLightTheme;
};

// Color palette for charts and visualizations
export const chartColorPalette = [
  '#0078D4', // Azure blue
  '#107C10', // Green
  '#FFB900', // Yellow/Gold
  '#D83B01', // Orange/Red
  '#8764B8', // Purple
  '#00B7C3', // Teal
  '#E3008C', // Magenta
  '#00CC6A', // Mint
];

// Status colors (consistent with Azure Portal)
export const statusColors = {
  success: '#107C10',
  warning: '#FFB900',
  error: '#D83B01',
  info: '#0078D4',
  inactive: '#8A8886',
  active: '#107C10',
  pending: '#FFB900',
  completed: '#107C10',
  cancelled: '#D83B01',
};

// Severity colors for notifications
export const severityColors = {
  info: '#0078D4',
  success: '#107C10',
  warning: '#FFB900',
  error: '#D83B01',
};

// Depth/elevation shadows (Azure Portal style)
export const shadows = {
  depth4: '0 1.6px 3.6px 0 rgba(0,0,0,.132), 0 0.3px 0.9px 0 rgba(0,0,0,.108)',
  depth8: '0 3.2px 7.2px 0 rgba(0,0,0,.132), 0 0.6px 1.8px 0 rgba(0,0,0,.108)',
  depth16: '0 6.4px 14.4px 0 rgba(0,0,0,.132), 0 1.2px 3.6px 0 rgba(0,0,0,.108)',
  depth64: '0 25.6px 57.6px 0 rgba(0,0,0,.220), 0 4.8px 14.4px 0 rgba(0,0,0,.180)',
};

// Typography styles (Segoe UI)
export const typography = {
  fontFamily: '"Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
  fontSizes: {
    hero: '68px',
    title1: '42px',
    title2: '32px',
    title3: '28px',
    subtitle1: '20px',
    subtitle2: '16px',
    body1: '14px',
    body2: '12px',
    caption: '12px',
    small: '10px',
  },
  fontWeights: {
    regular: 400,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    hero: '92px',
    title1: '52px',
    title2: '40px',
    title3: '36px',
    subtitle1: '28px',
    subtitle2: '22px',
    body1: '20px',
    body2: '16px',
    caption: '16px',
  },
};

// Spacing scale (4px baseline)
export const spacing = {
  xxs: '4px',
  xs: '8px',
  s: '12px',
  m: '16px',
  l: '20px',
  xl: '24px',
  xxl: '32px',
  xxxl: '40px',
};

// Border radius
export const borderRadius = {
  none: '0',
  small: '2px',
  medium: '4px',
  large: '8px',
  circular: '50%',
};

// Layout dimensions
export const layout = {
  headerHeight: '48px',
  sidebarWidth: '250px',
  sidebarCollapsedWidth: '48px',
  footerHeight: '32px',
  contentMaxWidth: '1920px',
  commandBarHeight: '44px',
};

// Breakpoints for responsive design
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 1024,
  lg: 1366,
  xl: 1920,
};

// Media queries
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
};

// Z-index layers
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
};

// Animation durations (Fluent motion)
export const animations = {
  ultraFast: '50ms',
  faster: '100ms',
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '400ms',
  ultraSlow: '500ms',
};

// Animation easing curves
export const easings = {
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
};

// Focus outline styles (accessibility)
export const focusOutline = {
  style: 'solid',
  width: '2px',
  color: '#000000',
  offset: '2px',
};

// Export all theme tokens
export const themeTokens = {
  chartColorPalette,
  statusColors,
  severityColors,
  shadows,
  typography,
  spacing,
  borderRadius,
  layout,
  breakpoints,
  mediaQueries,
  zIndex,
  animations,
  easings,
  focusOutline,
};
