
# tiliger

[![npm version](https://img.shields.io/npm/v/tiliger?style=for-the-badge)](https://www.npmjs.com/package/tiliger)

A command line tool to create predefined packages based on templates.

It's designed to create monorepos, with inherited configuration.

The idea behind it that in a monorepo many times you have very similar packages. With the help of tiliger you can spawn a new package. Also, it's possible to have your own setups, and reuse them later (_COMING LATER_).

Tiliger uses [lerna](https://github.com/lerna/lerna) to manage the packages.

## Installation

```bash
npm i -g tiliger
```

## Create a new project

`tiliger create <project>` creates a monorepo in the package name of `my-project-wrapper` in the `my-project` folder.
_The folder should not exist!_

#### Basic usage

```bash
tiliger create my-project
cd my-project
npm install
```

_Please change the git url-s in the `package.json` later on_

#### Usage with github repo

`tiliger create <project> --repo=<repo>` initialises the project with a github repository, and fills in the git urls in the `package.json`.

```bash
tiliger create my-project --repo=git@github.com:zsotyooo/tiliger-test-repo.git
cd my-project
npm install
```

#### Help

```
tiliger create --help
```

## Create a new package in the monorepo

`tiliger package <package>` creates a package inside the mono repo. The default setup is a typescipt and rollup based setup.

#### Basic usage

It will create a package with the name of `"my-package"`

```bash
cd /path/to/my-project
tiliger package my-package
npm run boot
```

#### Usage with scope

It creates a package with the name of `"@my-project/my-package"`.

```bash
cd /path/to/my-project
tiliger package my-package --scope=my-project
npm run boot
```

#### Usage with custom template

```bash
cd /path/to/my-project
tiliger package my-package --template="ts"
npm run boot
```

_Currently ony one template is available (ts), but new ones will be added frequently_

#### Help

```
tiliger package --help
```

## Authors

- [Zsolt Molnár](https://www.linkedin.com/in/zsotyooo)

## Read more

- [lerna](https://github.com/lerna/lerna)

## License

[MIT](https://opensource.org/licenses/MIT)
