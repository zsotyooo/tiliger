import typescriptPlugin from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import typescript from 'typescript';
import PluginService from './PluginService';

jest.mock('rollup-plugin-typescript2');
jest.mock('rollup-plugin-json');

describe('PluginService', () => {
  let service: PluginService;
  beforeEach(() => {
    service = new PluginService();
  });

  it('returns es2017 plugins', () => {
    const plugins = service.getEs2017BuildPlugins();
    expect(plugins.length).toBeLessThanOrEqual(2);
    expect(typescriptPlugin).toHaveBeenCalledWith({
      typescript,
      tsconfigOverride: {
        compilerOptions: {
          target: 'es2017',
        },
      },
    });
    expect(json).toHaveBeenCalledWith({
      preferConst: true,
    });
  });

  it('returns es5 plugins', () => {
    const plugins = service.getEs5BuildPlugins();
    expect(plugins.length).toBeLessThanOrEqual(2);
    expect(typescriptPlugin).toHaveBeenCalledWith({ typescript });
    expect(json).toHaveBeenCalledWith();
  });
});
