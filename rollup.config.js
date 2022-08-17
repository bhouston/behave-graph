import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';

import pkg from './package.json';

export default [
  {
    input: 'src/lib/index.ts',
    output: [
      {
        file: pkg.module,
        format: 'esm',
      },
    ],
    plugins: [commonjs(), typescript({ rootDir: './src/lib', exclude: ['**/*.test.ts'] }), del({ targets: 'dist' })],
  },
  {
    input: 'dist/lib/index.d.ts',
    output: [{ file: 'dist/lib/index.d.ts', format: 'esm' }],
    plugins: [
      dts(),
      del({
        targets: ['dist/lib/*', '!dist/lib/index.d.ts', '!dist/lib/index.js'],
        hook: 'buildEnd',
      }),
    ],
  },
  {
    input: 'src/examples/exec-graph/index.ts',
    output: [
      {
        file: 'dist/examples/exec-graph/index.js',
        format: 'esm',
      },
    ],
    plugins: [commonjs(), typescript({ rootDir: './src/examples/exec-graph' })],
  },
  {
    input: 'src/examples/web/index.ts',
    output: [
      {
        file: 'dist/examples/web/index.js',
        format: 'esm',
      },
    ],
    plugins: [commonjs(), typescript({ rootDir: './src/examples/web' })],
  },
  {
    input: 'src/examples/export-node-spec/index.ts',
    output: [
      {
        file: 'dist/examples/export-node-spec/index.js',
        format: 'esm',
      },
    ],
    plugins: [commonjs(), typescript({ rootDir: './src/examples/export-node-spec' })],
  },
];
