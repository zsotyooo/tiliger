const path = require('path');
const replaceInFile = require('replace-in-file');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

const getRegExp = s => new RegExp(`<%[\\s]*${s}[\\s]*%>`, 'g');

module.exports = async (package, replacements, verbose = false) => {
  try {
    const fromArr = [];
    const toArr = [];
    replacements.forEach(([from, to]) => {
      fromArr.push(getRegExp(from));
      toArr.push(to);
    });

    const res = replaceInFile.sync({
      files: [path.join(package.destDir(), '**', '*.*')],
      from: fromArr,
      to: toArr,
      ignore: ['**/node_modules/**', '**/dist/**', '**/coverage/**']
    });

    if (verbose) {
      res
        .filter(r => r.hasChanged)
        .forEach(r =>
          console.log(logSymbols.info, chalk.blue(`${r.file} updated`))
        );
    }

    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject(e);
  }
};
