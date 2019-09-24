import typescriptPlugin from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import typescript from 'typescript';
import pkg from './package.json';

const deps = [
  ...Object.keys(
    Object.assign({}, pkg.peerDependencies, pkg.dependencies, pkg.tiliger.rollup.external)
  ),
  ...pkg.tiliger.rollup.external || [],
];

const es5BuildPlugins = [
  typescriptPlugin({
    typescript
  }),
  json()
];

module.exports = [
  {
    input: 'index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    plugins: es5BuildPlugins,
    external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`))
  },
]
