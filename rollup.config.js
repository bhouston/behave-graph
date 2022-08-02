import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import del from "rollup-plugin-delete";

import pkg from "./package.json";

export default [
  {
    input: "src/lib/index.ts",
    output: [
      {
        file: pkg.module,
        format: "esm",
      },
    ],
    plugins: [commonjs(), typescript(), del({ targets: "dist/*" })],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [
      dts(),
      del({
        targets: ["dist/*", "!dist/index.d.ts", "!dist/index.js"],
        hook: "buildEnd",
      }),
    ],
  },
];
