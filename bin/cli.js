#!/usr/bin/env node

import process from 'node:process'
import minimist from 'minimist'
import gtex from '../index.js'

async function main() {
  const argv = minimist(process.argv.slice(2))
  await gtex(argv)
}

main()
