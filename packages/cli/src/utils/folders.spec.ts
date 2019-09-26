import os from "os";
import path from "path";
import fs from "fs-extra";
import {
  homeDir,
  namespaceDir,
  isNamespaceDirExist,
  ensureNamespaceDir,
  addTemplateRepo,
  addTemplateFolder
} from "./folders";

const userHomeDir = path.resolve(__dirname, "../../../../__fixtures__/home");
jest.mock("os");

(os as any).homedir.mockReturnValue(userHomeDir);

fs.removeSync(path.resolve(userHomeDir, ".tiliger"));

describe("homeDir", () => {
  it("returns tiliger homeDir", () => {
    expect(homeDir()).toEqual(path.resolve(userHomeDir, ".tiliger"));
  });
});

describe("namespaceDir", () => {
  it("returns tiliger namespace dir", () => {
    expect(namespaceDir("dummy")).toEqual(
      path.resolve(userHomeDir, ".tiliger", "templates", "dummy")
    );
  });
  it("sees if namespace dir doesn't exist", () => {
    expect(isNamespaceDirExist("not-existing-ns")).toEqual(false);
  });
  it("creates and sees if namespace dir exists", () => {
    expect(ensureNamespaceDir("existing-ns")).toEqual(
      path.resolve(userHomeDir, ".tiliger", "templates", "existing-ns")
    );
    expect(isNamespaceDirExist("existing-ns")).toEqual(true);
  });
});

describe("addTemplateRepo", () => {
  it("adds git repo", () => {
    expect(
      addTemplateRepo("ns-with-git", "git@github.com:zsotyooo/shoyu-slides.git")
    ).resolves.toEqual("");
  });
  it("errors when trying existing namespace", () => {
    expect(
      addTemplateRepo("ns-with-git", "git@github.com:zsotyooo/shoyu-slides.git")
    ).rejects.toEqual(Error('Namespace "ns-with-git" already added!'));
  });
  it("errors when repo doesn't exist", async () => {
    await expect(
      addTemplateRepo("ns-with-git-not-ex", "git@github.com:zsotyooo/norepo-here.git")
    ).rejects.toBeTruthy();
    expect(isNamespaceDirExist("ns-with-git-not-ex")).toEqual(false);
  });
});

const localDir = path.resolve(__dirname, "../../../../__fixtures__/local");
describe("addTemplateFolder", () => {
  it("adds template folder", () => {
    expect(addTemplateFolder("ns-with-local", localDir)).toEqual(path.resolve(userHomeDir, ".tiliger", "templates", "ns-with-local"));
  });
  it("errors when trying existing namespace", () => {
    expect(
      () => addTemplateFolder("ns-with-local", localDir)
    ).toThrowError('Namespace "ns-with-local" already added!');
  });
  it("errors when trying local folder doesn't exist", () => {
    expect(
      () => addTemplateFolder("ns-with-local-no-exist", path.resolve(__dirname, "../../../../__fixtures__/local-no-exist"))
    ).toThrowError();
  });
});
