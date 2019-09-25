const express = require('express')
const cors = require('cors')
const { getBasic, searchStock } = require('../dao')
const query = require('../query')
const request = require('../query/request')

const app = express()

app.use(cors())
app.options('*', cors()) // For All Pre-Flight Request

app.get('/basic', (req, res) => {
  const symbol = req.query.symbol
  getBasic(symbol).then(result => res.json(result))
})

app.get('/basic-realtime', (req, res) => {
  const symbol = req.query.symbol
  query.quote(symbol, { extend: 'detail' }).then(result => res.json(result))
})

app.get('/search-stock', (req, res) => {
  const keyword = req.query.keyword
  searchStock(keyword).then(result => {
    res.json(result)
  })
})

app.get('/share-pledge', (req, res) => {
  const symbol = req.query.symbol
  // 东方财富网股权质押数据
  request.get('https://data.eastmoney.com/DataCenter_V3/gpzy/chart.aspx', {
    t: 1,
    scode: symbol
  }, {
    headers: {
      Host: 'data.eastmoney.com',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
      Origin: 'https://xueqiu.com',
      'Accep-Encoding': 'gzip, deflate, br',
      Cookie: 'xq_a_token=75661393f1556aa7f900df4dc91059df49b83145;xq_is_login=1',
      Connection: 'keep-alive'
    }
  }).then(result => {
    res.json(JSON.parse(result))
  })
})

app.listen(3000, () => console.log('服务器成功启动'))
