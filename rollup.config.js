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
    plugins: [commonjs(), typescript(), del({ targets: 'dist/lib/*' })],
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
];
