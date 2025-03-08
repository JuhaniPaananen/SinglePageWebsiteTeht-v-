import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  },
});
