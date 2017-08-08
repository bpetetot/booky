const path = require('path')

const Koa = require('koa')
const mount = require('koa-mount')
const route = require('koa-route')
const serve = require('koa-static')

const books = require('./services/books')

const PORT = '3001'
const STATIC_FILES = path.resolve(__dirname, '..', 'gui', 'build')

const api = () => {
  const app = new Koa()
  app.use(route.get('/books/:isbn', books.fetch))
  return app
}

const init = () => {
  const app = new Koa()

  // serve GUI
  app.use(mount('/', serve(STATIC_FILES)))
  // server API
  app.use(mount('/api', api()))

  app.listen(PORT)
  console.log(`listening on port ${PORT}`)
}

module.exports = {
  init,
}
