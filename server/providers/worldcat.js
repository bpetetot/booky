/**
 * Google Books Provider
 * http://xisbn.worldcat.org/xisbnadmin/index.htm
 */

const fetch = require('node-fetch')
const pickBy = require('lodash/pickBy')
const identity = require('lodash/identity')

const URL = isbn => `http://xisbn.worldcat.org/webservices/xid/isbn/${isbn}?method=getEditions&format=json&fl=*`

const convertJson = (json) => {
  if (json && json.list && json.list.length > 0) {
    return json.list.map(item => ({
      title: item.title,
      publisher: item.publisher,
      publishedDate: item.year,
    }))
  }
  return undefined
}

const getByISBN = async (isbn) => {
  const response = await fetch(URL(isbn))
  const json = await response.json()
  const results = convertJson(json)
  if (results && results.length > 0) {
    return pickBy(results[0], identity)
  }
  return undefined
}

module.exports = {
  getByISBN,
}
