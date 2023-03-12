export const getTime = (diff) => ({
  seconds: Math.round((diff / 1000) % 60),
  minutes: Math.round((diff / (1000 * 60)) % 60),
  hours: Math.round((diff / (1000 * 3600)) % 24),
  days: Math.round((diff / (1000 * 3600 * 24)) % 30),
});
