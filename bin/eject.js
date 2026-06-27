#!/usr/bin/env node
'use strict';

const { join, resolve } = require('node:path');
const { cpSync, mkdirSync, existsSync } = require('node:fs');

const outputArg = process.argv[2] || '.';

const PKG_DIR = join(__dirname, '..');
const dest = resolve(process.cwd(), outputArg, 'layout-grid-system');

if (existsSync(dest)) {
  console.error(`Error: directory already exists — ${dest}`);
  process.exit(1);
}

mkdirSync(join(dest, 'src'), { recursive: true });
cpSync(join(PKG_DIR, 'src'), join(dest, 'src'), { recursive: true });
cpSync(join(PKG_DIR, 'grid.scss'), join(dest, 'grid.scss'));

console.log(`Ejected to: ${dest}`);
console.log('');
console.log('Update your @use path:');
console.log(`  @use '${outputArg}/layout-grid-system/grid' as grid;`);
