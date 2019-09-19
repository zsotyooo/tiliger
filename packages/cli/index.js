const chalk = require('chalk');
const logSymbols = require('log-symbols');
const git = require('./lib/git');
const replace = require('./lib/replace');
const { getPackage, copyPackage } = require('./lib/package');
const { getDirOrPwd } = require('./utils/index');

const createPackage = async (
  name,
  scope = false,
  template = 'ts',
  defaultGitUrl = false,
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

    const userName = await git(projectDir).userName();
    const userEmail = await git(projectDir).userEmail();
    const gitUrl = await git(projectDir).gitUrl(defaultGitUrl);

    copyPackage(pkg, verbose);

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
  defaultGitUrl = false,
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
      defaultGitUrl,
      true,
      verbose,
      silent,
      dir
    );

    const destDir = pkg.destDir();

    if (defaultGitUrl) {
      await git(destDir).init();
      await git(destDir).remoteSet(
        defaultGitUrl || 'git@github.com:dummy-user/dummy-repo.git'
      );
    }
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
