import path from 'path';
import getFiles, { getFilenameWithNewExtension } from '.';

const testFolder = path.resolve(__dirname, '../../../../__fixtures__/files');

describe('getFilenameWithNewExtension', () => {
  it('returns file with new extension', () => {
    expect(getFilenameWithNewExtension('foo.bar.ext', 'newext')).toBe('foo.bar.newext');
  });
});

describe('getFiles', () => {
  it('returns input file with type', () => {
    expect(getFiles('foo.ts', false, 'node', testFolder).input).toBe('foo.node.ts');
  });

  it('returns input file without type', () => {
    expect(getFiles('bar.ts', false, 'node', testFolder).input).toBe('bar.ts');
  });

  it('uses default project folder', () => {
    expect(getFiles('index.ts', false, 'node').input).toBe('index.ts');
  });

  it('returns output file being specified', () => {
    expect(getFiles('index.ts', 'dist/output.js', 'dummy', testFolder).output).toBe(
      'dist/output.js',
    );
  });

  it('returns output file without being specified', () => {
    expect(getFiles('index.ts', false, 'dummy', testFolder).output).toBe('dist/index.js');
  });
});
