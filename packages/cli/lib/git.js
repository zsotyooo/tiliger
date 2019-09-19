const git = require('simple-git');
const { getGitUrl } = require('../utils/index');

const getConfig = async (path, conf) =>
  new Promise((resolve, reject) => {
    git(path).raw(['config', '--global', '--get', conf], (err, res) => {
      if (!err) {
        resolve(res.trim());
      } else {
        reject('No git configured!');
      }
    });
  });

const getUrl = async (path, def = false) =>
  new Promise((resolve, reject) => {
    git(path).raw(['remote', 'get-url', 'origin'], (err, res) => {
      if (!err) {
        resolve(getGitUrl(res));
      } else {
        if (def) {
          resolve(getGitUrl(def));
        } else {
          reject(err);
        }
      }
    });
  });

const init = async path =>
  new Promise((resolve, reject) => {
    git(path).raw(['init', '--quiet'], (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });

const remoteSet = async (path, url) =>
  new Promise((resolve, reject) => {
    git(path).raw(['remote', 'add', 'origin', url], (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
module.exports = path => ({
  userName: async () => getConfig(path, 'user.name'),
  userEmail: async () => getConfig(path, 'user.email'),
  gitUrl: async (def = false) => getUrl(path, def),
  init: async () => init(path),
  remoteSet: async url => remoteSet(path, url)
});
