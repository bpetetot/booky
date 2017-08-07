const gbooks = require('../providers/googleBooks')
const openLib = require('../providers/openLibrary')
const isbndb = require('../providers/isbndb')
const worldcat = require('../providers/worldcat')

const fetch = async (ctx, isbn, next) => {
  if (ctx.request.method !== 'GET') return next

  const result1 = await openLib.getByISBN(isbn)
  const result2 = await gbooks.getByISBN(isbn)
  const result3 = await isbndb.getByISBN(isbn)
  const result4 = await worldcat.getByISBN(isbn)

  ctx.body = { isbn, ...result4, ...result3, ...result2, ...result1 }
}

module.exports = {
  fetch,
}
