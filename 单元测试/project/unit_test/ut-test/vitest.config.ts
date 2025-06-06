import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // ... Specify options here.
    environment: 'jsdom', // Use jsdom for testing React components
    globals: true, // Enable global test APIs like `describe`, `it`, etc.
    // setupFiles: ['./src/setupTests.ts'], // Path to setup file for global configurations
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'], // Include test files
    coverage: {
      provider: 'v8', // Use V8 for coverage reporting  
  }
}
});
