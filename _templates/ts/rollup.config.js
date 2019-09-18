import typescriptPlugin from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import typescript from 'typescript';
import generateConfig from '../../config/rollup.gen-config';
import pkg from './package.json';

export default [...generateConfig(pkg, typescript, typescriptPlugin, json)];
