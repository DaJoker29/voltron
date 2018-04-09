#!/usr/bin/env node
const fs = require('fs');
const { resolve } = require('path');

console.log('Start of POSTINSTALL');

const symlinks = [
  [resolve(__dirname, '../lib'), resolve(__dirname, '../node_modules/@volt')],
  [
    resolve(__dirname, 'pre-commit.sh'),
    resolve(__dirname, '../.git/hooks/pre-commit'),
  ],
];

console.log(`--Creating ${symlinks.length} symlinks...`);

symlinks.forEach(([target, path]) => {
  if (fs.existsSync(path)) {
    console.log(`--Link already exists: ${path}`);
  } else {
    fs.symlinkSync(target, path, 'junction');
    console.log(`--Symlink created: ${path}`);
  }
});

console.log('--Done creating symlinks\nEnd of POSTINSTALL');
