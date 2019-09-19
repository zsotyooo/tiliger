const getDirOrPwd = (dir = null) => dir || process.env.PWD;

const getGitUrl = url => url
  .trim()
  .replace('git@github.com:', 'https://github.com/')
  .replace(/\.git$/, '');

module.exports = {
  getDirOrPwd,
  getGitUrl
};
