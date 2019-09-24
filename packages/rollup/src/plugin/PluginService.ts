import typescriptPlugin from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import typescript from 'typescript';
import { Plugin } from 'rollup';

class PluginService {
  /* istanbul ignore next */
  private es5BuildPlugins?: Plugin[];

  /* istanbul ignore next */
  private es2017BuildPlugins?: Plugin[];

  getEs5BuildPlugins() {
    if (!this.es5BuildPlugins) {
      this.es5BuildPlugins = [
        typescriptPlugin({
          typescript,
        }),
        json() as Plugin,
      ];
    }
    return this.es5BuildPlugins;
  }

  getEs2017BuildPlugins() {
    /* istanbul ignore next reason: it's a standard way of doing this */
    if (!this.es2017BuildPlugins) {
      this.es2017BuildPlugins = [
        typescriptPlugin({
          typescript,
          tsconfigOverride: {
            compilerOptions: {
              target: 'es2017',
            },
          },
        }),
        json({
          preferConst: true,
        }) as Plugin,
      ];
    }
    return this.es2017BuildPlugins;
  }
}

export default PluginService;
