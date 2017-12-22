#!/usr/bin/env node
'use strict'

const { resolve } = require('path')
const { exec } = require('child_process')

exec('yarn link', {
  cwd: resolve(__dirname, '..', 'packages', 'vuikit')
}, (error) => {
  if (error) {
    console.error(error)
    process.exit(1)
  }
})
