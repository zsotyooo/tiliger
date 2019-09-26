import os from "os";
import path from "path";
import fs from "fs-extra";
import simplegit, { SimpleGit } from "simple-git/promise";

const tick = async () => setTimeout(() => {}, 100);


export const homeDir = () => {
  const homeDir = path.resolve(os.homedir(), ".tiliger");
  fs.ensureDirSync(homeDir);
  return homeDir;
};

export const namespaceDir = (ns: string) => {
  const nsDir = path.resolve(homeDir(), "templates", ns);
  return nsDir;
};

export const ensureNamespaceDir = (ns: string) => {
  const nsDir = namespaceDir(ns);
  fs.ensureDirSync(nsDir);
  return nsDir;
};

export const isNamespaceDirExist = (ns: string) => {
  return fs.pathExistsSync(namespaceDir(ns));
};

const getGitForNamespace = (ns: string): SimpleGit => {
  return simplegit(namespaceDir(ns)).silent(true);
};

export const addTemplateRepo = async (ns: string, repo: string) => {
  if (isNamespaceDirExist(ns)) {
    throw new Error(`Namespace "${ns}" already added!`);
  }
  const nsDir = ensureNamespaceDir(ns);
  try {
    await getGitForNamespace(nsDir).clone(repo, nsDir);
    // await tick();
    console.log(path.resolve(nsDir, '.git'));
    fs.removeSync(path.resolve(nsDir, '.git'));
    return "";
  } catch (e) {
    fs.removeSync(nsDir);
    throw e;
  }
};

export const addTemplateFolder = (ns: string, folder: string) => {
  if (isNamespaceDirExist(ns)) {
    throw new Error(`Namespace "${ns}" already added!`);
  }
  const localFolder = path.resolve(folder);
  const nsDir = namespaceDir(ns);
  fs.copySync(localFolder, nsDir, { errorOnExist: true });
  return nsDir;
};
