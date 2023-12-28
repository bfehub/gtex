#!/usr/bin/env node

const minimist = require("minimist");
const gtex = require("../");

async function main() {
  const argv = minimist(process.argv.slice(2));
  await gtex(argv);
}

main();
