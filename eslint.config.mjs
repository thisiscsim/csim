import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      'node_modules/**',
      '.git/**',
      'public/**',
      '*.config.js',
      '*.config.mjs',
      'coverage/**',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:prettier/recommended'),
];

export default eslintConfig;
