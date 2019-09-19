const express = require('express')
const { getBasic } = require('../dao')
const query = require('../query')

const app = express()

app.get('/basic', (req, res) => {
  const symbol = req.query.symbol
  getBasic(symbol).then(result => res.json(result))
})

app.get('/basic-realtime', (req, res) => {
  const symbol = req.query.symbol
  query.quote(symbol, { extend: 'detail' }).then(result => res.json(result))
})

app.listen(3000, () => console.log('服务器成功启动'))
