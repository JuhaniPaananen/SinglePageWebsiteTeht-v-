import babel from '@rollup/plugin-babel';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'esm',
  },
  plugins: [
    babel({
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
    }),
  ],
});