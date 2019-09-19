const Mongo = require('mongodb').MongoClient
const ALL_STOCKS = require('../ALL_STOCKS')
const query = require('../query')
const url = 'mongodb://localhost:27017/stock'

async function init () {
  const client = await Mongo.connect(url, {
    poolSize: 5,
    keepAlive: false
  })
  const db = client.db('stock')
  const collection = await db.collection('basic')
  for (let i = 0; i < ALL_STOCKS.length; i++) {
    const stock = ALL_STOCKS[i]

    await sleep() // 睡眠 避免请求过于频繁导致雪球服务器禁止访问

    const basic = await query.quote(stock.symbol, {
      extend: 'detail'
    })
    await collection.insertOne(basic)
  }
  await client.close()
}

// 睡眠一秒钟
function sleep () {
  return new Promise(resolve => setTimeout(resolve, 1000))
}

init().catch(e => console.log(e))
