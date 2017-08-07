const route = require('koa-route')
const Koa = require('koa')
const books = require('./services/books')

const PORT = '3001'

const init = () => {
  const app = new Koa()

  app.use(route.get('/books/:isbn', books.fetch))

  app.listen(PORT)
  console.log(`listening on port ${PORT}`)
}

module.exports = {
  init,
}
