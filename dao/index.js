const Mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/stock'

async function getBasic (symbol) {
  const client = await Mongo.connect(url)
  const db = client.db('stock')
  const collection = await db.collection('basic')
  const result = await collection.findOne({
    symbol
  })
  client.close()
  return result
}

module.exports = {
  getBasic
}
