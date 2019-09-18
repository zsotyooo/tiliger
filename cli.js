#!/usr/bin/env node

const yargs = require('yargs');
const { createPackage, createProject } = require('./index');

yargs
  .command({
    command: 'package <name>',
    desc: 'create a package from a predefined template',
    builder: y =>
      y.options({
        scope: {
          alias: 's',
          default: false,
          description: 'package scope'
        },
        template: {
          alias: 't',
          default: 'ts',
          description: 'template to use'
        }
      }),
    handler: function(argv) {
      createPackage(
        argv.name,
        argv.scope,
        argv.template,
        false,
        false,
        true,
        false
      );
    }
  })
  .command({
    command: 'init [folder]',
    desc: 'create a project from a predefined template',
    builder: y =>
      y.options({
        scope: {
          alias: 's',
          default: false,
          description: 'package scope'
        },
        template: {
          alias: 't',
          default: '_base',
          description: 'template to use'
        },
        repo: {
          alias: 'r',
          default: false,
          description: 'git repository URL'
        }
      }),
    handler: function(argv) {
      createProject(
        argv.folder,
        argv.scope,
        argv.template,
        argv.repo,
        true,
        false
      );
    }
  })
  .help().argv;
