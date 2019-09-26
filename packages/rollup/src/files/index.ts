import path from 'path';
import fs from 'fs-extra';

/* istanbul ignore next */
function getFilenameWithType(fn: string, type: string) {
  const fnArr = fn.split('.');
  const ext = fnArr.pop();
  return [...fnArr, type, ext].join('.');
}

function fileExists(folder: string, fn: string) {
  return fs.pathExistsSync(path.join(folder, fn));
}

function fileExistsWithType(folder: string, fn: string, type: string) {
  return fileExists(folder, getFilenameWithType(fn, type));
}

export function getFilenameWithNewExtension(fn: string, newExt: string) {
  const fnArr = fn.split('.');
  fnArr.pop();
  return [...fnArr, newExt].join('.');
}

export interface Files {
  input: string;
  output: string;
}

const getFiles = (
  inputFile: string,
  outputFile: string | false,
  type: string,
  projectFolder?: string,
): Files => {
  const pFolder = projectFolder || process.env.PWD;
  /* istanbul ignore next reason: process.env.PWD should be always there */
  if (!pFolder) {
    throw new Error(
      "Can't determine project folder! Pls make sure that `process.env.PWD` is available or provide `projectFolder` explicitly!",
    );
  }
  const input = fileExistsWithType(pFolder, inputFile, type)
    ? getFilenameWithType(inputFile, type)
    : inputFile;
  return {
    input,
    output: outputFile || `dist/${getFilenameWithNewExtension(inputFile, 'js')}`,
  };
};

export default getFiles;
