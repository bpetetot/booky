#!/usr/bin/env node --harmony
require('dotenv').config()

const gbooks = require('./providers/gbooks')

process.on('unhandledRejection', r => console.log(r))

const start = async () => {
  const result = await gbooks.fetchBook('isbn:9782205049657', 'fr')

  result.items.forEach(e => console.log(e.volumeInfo.title))
}

start()
