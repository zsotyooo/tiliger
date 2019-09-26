import path from 'path';
import { RollupWatchOptions, OutputOptions } from 'rollup';
import { defaults } from 'underscore';
import getFiles, { getFilenameWithNewExtension } from '../files';
import createPluginService from '../plugin';

export type EnvironmentType = 'node' | 'browser' | 'both';

function createBuilds(
  inputFile: string,
  pkg: { [index: string]: any },
  environment: EnvironmentType,
  projectFolder?: string,
): RollupWatchOptions[] {
  const tiligerConf = defaults(pkg.tiliger || {}, {
    rollup: {
      external: [],
    },
  });

  const deps = [
    ...Object.keys({
      ...pkg.peerDependencies,
      ...pkg.dependencies,
    }),
    ...tiligerConf.rollup.external,
  ];

  /* istanbul ignore next */
  const externalFilter = (id: string) => deps.some(dep => id === dep || id.startsWith(`${dep}/`));

  const plugins = createPluginService();
  const builds: RollupWatchOptions[] = [];
  if (environment === 'browser' || environment === 'both') {
    const cjsFiles = getFiles(inputFile, pkg.browser || false, 'cjs', projectFolder);
    const moduleFiles = getFiles(inputFile, pkg.module || false, 'esm', projectFolder);
    const esm2017Files = getFiles(inputFile, pkg.esm2017 || false, 'esm', projectFolder);

    builds.push({
      input: cjsFiles.input,
      output: { file: cjsFiles.output, format: 'cjs', sourcemap: true },
      plugins: plugins.getEs5BuildPlugins(),
      external: externalFilter,
    });

    if (pkg.esm2017) {
      /* istanbul ignore next reason: it's covered */
      if (cjsFiles.output !== esm2017Files.output) {
        builds.push({
          input: esm2017Files.input,
          output: { file: esm2017Files.output, format: 'es', sourcemap: true } as OutputOptions,
          plugins: plugins.getEs2017BuildPlugins(),
          external: externalFilter,
        });
      }
    } else if (cjsFiles.output !== moduleFiles.output) {
      builds.push({
        input: moduleFiles.input,
        output: { file: moduleFiles.output, format: 'es', sourcemap: true },
        plugins: plugins.getEs5BuildPlugins(),
        external: externalFilter,
      });
    }
  }

  if (environment === 'node' || environment === 'both') {
    const nodeFiles = getFiles(inputFile, pkg.main || false, 'node', projectFolder);
    builds.push({
      input: nodeFiles.input,
      output: { file: nodeFiles.output, format: 'cjs', sourcemap: true },
      plugins: plugins.getEs5BuildPlugins(),
      external: externalFilter,
    });
  }

  if (pkg.bin) {
    let bins: string[] = [];
    if (typeof pkg.bin === 'string') {
      bins.push(pkg.bin);
    } else {
      bins = Object.values(pkg.bin as { [index: string]: string });
    }
    bins.forEach(outputFile => {
      const binFiles = getFiles(
        path.basename(getFilenameWithNewExtension(outputFile, 'ts')),
        outputFile,
        'node',
        projectFolder,
      );
      builds.push({
        input: binFiles.input,
        output: { file: binFiles.output, format: 'cjs', sourcemap: true },
        plugins: plugins.getEs5BuildPlugins(),
        external: externalFilter,
      });
    });
  }

  return builds;
}

export default createBuilds;
