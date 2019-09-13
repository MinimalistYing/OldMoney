const https = require('https')
const qs = require('querystring')
const isURL = require('bape/isURL')
const isObject = require('bape/isObject')

const OPTIONS = {
  rejectUnauthorized: false,
  headers: {
    Host: 'stock.xueqiu.com',
    Accept: 'application/json',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
    Origin: 'https://xueqiu.com',
    'Accep-Encoding': 'gzip, deflate, br',
    Cookie: 'xq_a_token=c46b674ae9943534cd503c96a574e92a8b52d979;xq_is_login=1',
    Connection: 'keep-alive'
  }
}

const base = 'https://stock.xueqiu.com/v5/stock/' // 雪球基准 url

module.exports = {
  get: (url, params, options) => new Promise((resolve, reject) => {
    options = {
      ...OPTIONS,
      ...options
    }
    console.log(`${isURL(url) ? url : base + url}${isObject(params) ? '?' + qs.encode(params) : params}`)
    https.get(`${isURL(url) ? url : base + url}${isObject(params) ? '?' + qs.encode(params) : params}`, options, res => {
      console.log('statusCode:', res.statusCode)
      // console.log('headers', res.headers)
      const contentType = res.headers['content-type']
      res.setEncoding('utf8')

      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        if (contentType.includes('application/json')) {
          try {
            const parsed = JSON.parse(data)
            resolve(parsed)
          } catch (e) {
            console.error(e)
          }
        } else {
          resolve(data)
        }
      })
    }).on('error', e => {
      console.error(e)
    })
  })
}
