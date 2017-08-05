#!/usr/bin/env node --harmony
require('dotenv').config()

process.on('unhandledRejection', r => console.log(r))

const gbooks = require('./providers/googleBooks')
const openLib = require('./providers/openLibrary')
const isbndb = require('./providers/isbndb')
const worldcat = require('./providers/worldcat')

const start = async () => {
  const isbn = 9782205049657
  const result1 = await openLib.getByISBN(isbn)
  const result2 = await gbooks.getByISBN(isbn)
  const result3 = await isbndb.getByISBN(isbn)
  const result4 = await worldcat.getByISBN(isbn)
  console.log({ isbn, ...result4, ...result3, ...result2, ...result1 })
}

start()
