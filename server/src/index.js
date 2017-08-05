#!/usr/bin/env node --harmony
require('dotenv').config()

process.on('unhandledRejection', r => console.log(r))

const gbooks = require('./providers/googleBooks')
const openLib = require('./providers/openLibrary')

const start = async () => {
  const result1 = await gbooks.getByISBN(9782205049657)
  const result2 = await openLib.getByISBN(9782205049657)

  console.log({ ...result1, ...result2 })
}

start()
