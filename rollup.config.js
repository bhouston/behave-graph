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
    plugins: [commonjs(), typescript({ rootDir: './src/lib' }), del({ targets: 'dist/lib/*' })],
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
    input: 'src/examples/command/index.ts',
    output: [
      {
        file: 'dist/examples/command/index.js',
        format: 'esm',
      },
    ],
    plugins: [commonjs(), typescript({ rootDir: './src/examples/command' }), del({ targets: 'dist/examples/command/*' })],
  },
  {
    input: 'src/examples/web/index.ts',
    output: [
      {
        file: 'dist/examples/web/index.js',
        format: 'esm',
      },
    ],
    plugins: [commonjs(), typescript({ rootDir: './src/examples/web' }), del({ targets: 'dist/examples/web/*' })],
  },
];
