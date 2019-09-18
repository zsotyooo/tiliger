const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const { getDirOrPwd } = require('../utils/index');

const getPackage = (
  packageName,
  scope = false,
  template = 'ts',
  isRoot = false,
  dir = null
) => ({
  dir: () => getDirOrPwd(dir),
  name: () => packageName,
  fullName: () => (scope ? `@${scope}/${packageName}` : packageName),
  srcDir: () => path.join(__dirname, '..', '_templates', template),
  destDir: () =>
    isRoot
      ? path.join(getDirOrPwd(dir), packageName)
      : path.join(getDirOrPwd(dir), 'packages', packageName)
});

const copyPackage = (pkg, verbose = false) => {
  if (fs.pathExistsSync(pkg.destDir())) {
    throw new Error(`Path (${pkg.destDir()}) already exists!`);
  }

  fs.ensureDirSync(pkg.destDir());

  fs.copySync(pkg.srcDir(), pkg.destDir(), {
    overwrite: false,
    errorOnExist: true
  });

  if (verbose) {
    console.log(
      logSymbols.success,
      chalk.green(`${pkg.name()} package folder created.`)
    );
  }
};

module.exports = {
  getPackage,
  copyPackage
};
