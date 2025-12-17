// Layout constants
export const LAYOUT = {
  SIDEBAR_WIDTH: 240,
  NAVBAR_HEIGHT: 72,
  CONTENT_PADDING: { xs: 16, sm: 24, md: 32 },
} as const;

// Color palette - unified across all components
export const COLORS = {
  // Base backgrounds
  sidebar: "#161e2b",
  navbar: "#161e2b",
  background: "#f5f5f5",
  paper: "#ffffff",

  // Accent colors
  accent: "#0d9488",
  accentGradient: "linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)",

  // Primary palette
  primary: "#3b82f6",
  primaryHover: "#2563eb",
  primaryDark: "#0D47A1",

  // Secondary palette
  secondary: "#ff6f00",

  // Text colors
  textPrimary: "rgba(255, 255, 255, 0.9)",
  textSecondary: "rgba(255, 255, 255, 0.5)",
  textMuted: "#64748b",
  textLight: "#94a3b8",
  textDark: "#1e293b",

  // Interactive states
  hoverBg: "rgba(255, 255, 255, 0.08)",
  focusBg: "rgba(255, 255, 255, 0.15)",

  // Status colors (for notifications, alerts)
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",

  // Badge colors
  badge: "#ef4444",

  // Card and border colors
  cardBg: "#f8fafc",
  border: "#e2e8f0",
  borderLight: "#f1f5f9",
  divider: "rgba(0, 0, 0, 0.12)",
} as const;

// Semantic color aliases for specific use cases
export const STATUS_COLORS = {
  online: COLORS.success,
  offline: COLORS.textMuted,
  warning: COLORS.warning,
  error: COLORS.error,
  idle: COLORS.secondary,
} as const;

// Schedule/Chart colors for data visualization
export const CHART_COLORS = {
  primary: "#1a237e",
  secondary: "#0d9488",
  tertiary: "#f59e0b",
  quaternary: "#8b5cf6",
} as const;
