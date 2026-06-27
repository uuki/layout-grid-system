import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['tests/helpers.ts'],
      reporter: ['text', 'json', 'json-summary', 'lcov'],
      reportsDirectory: 'coverage',
    },
  },
});
