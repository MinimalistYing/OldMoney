const https = require('https')
const qs = require('querystring')
const base = require('./API').base

const options = {
  headers: {
    Host: 'stock.xueqiu.com',
    Accept: 'application/json',
    'User-Agent': 'Xueqiu iPhone 11.29',
    Cookie: 'xq_a_token=c46b674ae9943534cd503c96a574e92a8b52d979;xq_is_login=1',
    Connection: 'keep-alive'
  }
}

module.exports = {
  get: (url, params) => new Promise((resolve, reject) => {
    console.log(`${base}${url}?${qs.encode(params)}`)
    https.get(`${base}${url}?${qs.encode(params)}`, options, res => {
      console.log('statusCode:', res.statusCode)
      res.setEncoding('utf8')

      res.on('data', data => {
        try {
          resolve(JSON.parse(data).data)
        } catch (e) {
          resolve(data)
        }
      })
    }).on('error', e => {
      console.error(e)
    })
  })
}
