#!/usr/bin/env node
const { resolve } = require('path');
const fs = require('fs-extra');

console.log('Start of PREINSTALL');

const symlink = resolve(__dirname, '../node_modules/@volt');

console.log(`--Removing symlink from node_modules...`);

if (fs.existsSync(symlink)) {
  fs
    .unlink(symlink)
    .then(() => console.log(`--Deleted symlink ${symlink}\nEnd of PREINSTALL`))
    .catch(console.debug);
} else {
  console.log(`--No symlink found.\nEnd of PREINSTALL`);
}
