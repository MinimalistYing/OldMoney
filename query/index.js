const request = require('./request')
const api = require('./API')

Object.keys(api).map(key => {
  exports[key] = symbol => request.get(api[key], { symbol })
})
