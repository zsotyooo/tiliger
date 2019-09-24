import path from 'path';
import createConfig from '.';
// import PluginService from '../plugin/PluginService';
// jest.mock('../plugin/PluginService');

const testFolder = path.resolve(__dirname, '..', '__MOCK__');

describe('createConfig', () => {
  describe('config for node cjs', () => {
    describe('with no specific input files', () => {
      it('creates config if there is no pkg info', () => {
        const config = createConfig('bar.ts', {}, 'node', testFolder);

        expect(config.length).toBe(1);

        expect(config[0].input).toEqual('bar.ts');
        expect(config[0].output).toMatchObject({
          file: 'dist/bar.js',
          format: 'cjs',
          sourcemap: true,
        });
      });
      it('creates config if there is pkg info', () => {
        const config = createConfig('bar.ts', { main: 'dist/node.js' }, 'node', testFolder);

        expect(config.length).toBe(1);

        expect(config[0].input).toEqual('bar.ts');
        expect(config[0].output).toMatchObject({
          file: 'dist/node.js',
          format: 'cjs',
          sourcemap: true,
        });
      });
    });
    describe('with specific input files', () => {
      it('creates config if there is no pkg info', () => {
        const config = createConfig('foo.ts', {}, 'node', testFolder);

        expect(config.length).toBe(1);

        expect(config[0].input).toEqual('foo.node.ts');
        expect(config[0].output).toMatchObject({
          file: 'dist/foo.js',
          format: 'cjs',
          sourcemap: true,
        });
      });
      it('creates config if there is pkg info', () => {
        const config = createConfig('foo.ts', { main: 'dist/something.js' }, 'node', testFolder);

        expect(config.length).toBe(1);

        expect(config[0].input).toEqual('foo.node.ts');
        expect(config[0].output).toMatchObject({
          file: 'dist/something.js',
          format: 'cjs',
          sourcemap: true,
        });
      });
    });
  });

  describe('config for browser', () => {
    describe('with no specific input files', () => {
      it('creates single cjs if there is no pkg info', () => {
        const config = createConfig('bar.ts', {}, 'browser', testFolder);

        expect(config.length).toBe(1);

        expect(config[0].input).toEqual('bar.ts');
        expect(config[0].output).toMatchObject({
          file: 'dist/bar.js',
          format: 'cjs',
          sourcemap: true,
        });
      });
      it('creates single esm, and cjs if there is pkg info', () => {
        const config = createConfig(
          'bar.ts',
          { browser: 'dist/something.cjs.js', module: 'dist/something.esm.js' },
          'browser',
          testFolder,
        );

        expect(config.length).toBe(2);

        expect(config[0].input).toEqual('bar.ts');
        expect(config[0].output).toMatchObject({
          file: 'dist/something.cjs.js',
          format: 'cjs',
          sourcemap: true,
        });

        expect(config[1].input).toEqual('bar.ts');
        expect(config[1].output).toMatchObject({
          file: 'dist/something.esm.js',
          format: 'es',
          sourcemap: true,
        });
      });

      it("prefers esm2017 if it's set in the pkg", () => {
        const config = createConfig(
          'bar.ts',
          {
            browser: 'dist/something.cjs.js',
            module: 'dist/something.esm.js',
            esm2017: 'dist/something.esm2017.js',
          },
          'browser',
          testFolder,
        );

        expect(config.length).toBe(2);

        expect(config[0].input).toEqual('bar.ts');
        expect(config[0].output).toMatchObject({
          file: 'dist/something.cjs.js',
          format: 'cjs',
          sourcemap: true,
        });

        expect(config[1].input).toEqual('bar.ts');
        expect(config[1].output).toMatchObject({
          file: 'dist/something.esm2017.js',
          format: 'es',
          sourcemap: true,
        });
      });
    });
    describe('with specific input files', () => {
      it('creates single cjs if there is no pkg info', () => {
        const config = createConfig('foo.ts', {}, 'browser', testFolder);

        expect(config.length).toBe(1);

        expect(config[0].input).toEqual('foo.cjs.ts');
        expect(config[0].output).toMatchObject({
          file: 'dist/foo.js',
          format: 'cjs',
          sourcemap: true,
        });
      });
      it('creates single esm, and cjs if there is pkg info', () => {
        const config = createConfig(
          'foo.ts',
          { browser: 'dist/something.cjs.js', module: 'dist/something.esm.js' },
          'browser',
          testFolder,
        );

        expect(config.length).toBe(2);

        expect(config[0].input).toEqual('foo.cjs.ts');
        expect(config[0].output).toMatchObject({
          file: 'dist/something.cjs.js',
          format: 'cjs',
          sourcemap: true,
        });

        expect(config[1].input).toEqual('foo.esm.ts');
        expect(config[1].output).toMatchObject({
          file: 'dist/something.esm.js',
          format: 'es',
          sourcemap: true,
        });
      });

      it("prefers esm2017 if it's set in the pkg", () => {
        const config = createConfig(
          'foo.ts',
          {
            browser: 'dist/something.cjs.js',
            module: 'dist/something.esm.js',
            esm2017: 'dist/something.esm2017.js',
          },
          'browser',
          testFolder,
        );

        expect(config.length).toBe(2);

        expect(config[0].input).toEqual('foo.cjs.ts');
        expect(config[0].output).toMatchObject({
          file: 'dist/something.cjs.js',
          format: 'cjs',
          sourcemap: true,
        });

        expect(config[1].input).toEqual('foo.esm.ts');
        expect(config[1].output).toMatchObject({
          file: 'dist/something.esm2017.js',
          format: 'es',
          sourcemap: true,
        });
      });
    });
  });
});
