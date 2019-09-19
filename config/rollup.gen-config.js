export default function(pkg, typescript, typescriptPlugin, json) {
  const deps = Object.keys(
    Object.assign({}, pkg.peerDependencies, pkg.dependencies)
  );

  /**
   * ES5 Builds
   */
  const es5BuildPlugins = [
    typescriptPlugin({
      typescript
    }),
    json()
  ];

  const es5Builds = [
    {
      input: 'index.ts',
      output: [
        { file: pkg.browser, format: 'cjs', sourcemap: true },
        { file: pkg.module, format: 'es', sourcemap: true }
      ],
      plugins: es5BuildPlugins,
      external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`))
    }
    // {
    //   input: 'index.node.ts',
    //   output: {
    //     file: pkg.main,
    //     format: 'cjs',
    //     sourcemap: true
    //   },
    //   plugins: es5BuildPlugins,
    //   external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`))
    // },
  ];

  /**
   * ES2017 Builds
   */
  const es2017BuildPlugins = [
    typescriptPlugin({
      typescript,
      tsconfigOverride: {
        compilerOptions: {
          target: 'es2017'
        }
      }
    }),
    json({
      preferConst: true
    })
  ];

  const es2017Builds = [
    /**
     *  Browser Builds
     */
    {
      input: 'index.ts',
      output: {
        file: pkg.esm2017,
        format: 'es',
        sourcemap: true
      },
      plugins: es2017BuildPlugins,
      external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`))
    }
  ];

  return [...es5Builds, ...es2017Builds];
}
