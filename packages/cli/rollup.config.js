// import typescriptPlugin from 'rollup-plugin-typescript2';
// import json from 'rollup-plugin-json';
// import typescript from 'typescript';
import createBuilds from "@tiliger/rollup";
import pkg from './package.json';

// const deps = [
//   ...Object.keys(
//     Object.assign({}, pkg.peerDependencies, pkg.dependencies, pkg.tiliger.rollup.external)
//   ),
//   ...pkg.tiliger.rollup.external || [],
// ];

// const es5BuildPlugins = [
//   typescriptPlugin({
//     typescript
//   }),
//   json()
// ];

// module.exports = [
//   {
//     input: 'index.ts',
//     output: {
//       file: pkg.main,
//       format: 'cjs',
//       sourcemap: true
//     },
//     plugins: es5BuildPlugins,
//     external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`))
//   },
//   {
//     input: 'bin.ts',
//     output: {
//       file: pkg.bin,
//       format: 'cjs',
//       sourcemap: true
//     },
//     plugins: es5BuildPlugins,
//     external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`))
//   },
// ]

module.exports = [
  ...createBuilds('index.ts', pkg, 'node'),
]