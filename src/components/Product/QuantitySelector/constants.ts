// Generate steps of 10 from 0 to 3000
export const QUANTITY_TIERS = {
  low: Array.from({ length: 6 }, (_, i) => i * 10), // 0-50
  medium: Array.from({ length: 45 }, (_, i) => (i + 5) * 10), // 50-500
  high: Array.from({ length: 251 }, (_, i) => (i + 50) * 10).filter(n => n <= 3000) // 500-3000
};

// Combine all steps into a single array
export const ALL_STEPS = Array.from({ length: 301 }, (_, i) => i * 10);