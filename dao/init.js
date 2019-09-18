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
  for (const stock of ALL_STOCKS) {
    const basic = await query.quote(stock.symbol, {
      extend: 'detail'
    })
    await collection.insertOne(basic)
  }
  await client.close()
}

init().catch(e => console.log(e))
