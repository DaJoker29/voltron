#!/usr/bin/env node
const fs = require('fs');

const symlinks = [
  ['../lib', 'node_modules/@volt'],
  ['../../tools/pre-commit.sh', '.git/hooks/pre-commit'],
];

console.log(`Creating ${symlinks.count} symlinks...`);

symlinks.forEach(([target, path]) => {
  if (fs.existsSync(path)) {
    console.log(`Link already exists: ${path}`);
  } else {
    fs.symlinkSync(target, path, 'junction');
    console.log(`Symlink created: ${path}`);
  }
});

console.log('Done creating symlinks');
