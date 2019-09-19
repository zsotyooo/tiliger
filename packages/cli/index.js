const chalk = require('chalk');
const logSymbols = require('log-symbols');
const git = require('./lib/git');
const replace = require('./lib/replace');
const { getPackage, createPackageFolder, copyPackage } = require('./lib/package');

const createPackage = async (
  name,
  scope = false,
  template = 'ts',
  gitRepoUrl = false,
  isRoot = false,
  verbose = false,
  silent = false,
  dir = null
) => {
  try {
    if (!name) {
      throw new Error('Missing package name!');
    }

    const pkg = getPackage(name, scope, template, isRoot, dir);

    const packageName = pkg.name();
    const fullPackageName = pkg.fullName();
    const projectDir = pkg.dir();

    createPackageFolder(pkg);

    if (isRoot) {
      const destDir = pkg.destDir();

      if (gitRepoUrl) {
        await git(destDir).init();
        await git(destDir).remoteSet(gitRepoUrl);
      }
    }

    copyPackage(pkg, verbose);

    const userName = await git(projectDir).userName();
    const userEmail = await git(projectDir).userEmail();
    const gitUrl = await git(projectDir).gitUrl('https://CHANGE.ME.LATER/DUMMY/FOO');

    const replacements = [
      ['FULL_PACKAGE_NAME', fullPackageName],
      ['PACKAGE_NAME', packageName],
      ['USER_NAME', userName],
      ['USER_EMAIL', userEmail],
      ['GIT_URL', gitUrl]
    ];
    await replace(pkg, replacements, verbose);
  } catch (e) {
    if (verbose) {
      console.error(logSymbols.error, chalk.red(e.message));
    }
    if (!silent) {
      return Promise.reject(e);
    }
    return Promise.resolve();
  }
  return Promise.resolve();
};

const createProject = async (
  name,
  scope = false,
  template = '_base',
  gitRepoUrl = false,
  verbose = false,
  silent = false,
  dir = null
) => {
  try {
    if (!name) {
      throw new Error('Missing package name!');
    }

    const pkg = getPackage(name, scope, template, true, dir);

    await createPackage(
      name,
      scope,
      template,
      gitRepoUrl,
      true,
      verbose,
      silent,
      dir
    );
  } catch (e) {
    if (verbose) {
      console.error(logSymbols.error, chalk.red(e.message));
    }
    if (!silent) {
      return Promise.reject(e);
    }
    return Promise.resolve();
  }
  return Promise.resolve();
};

module.exports = {
  createPackage,
  createProject
};
