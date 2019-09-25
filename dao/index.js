const Mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/stock'

async function query (work) {
  const client = await Mongo.connect(url)
  const db = client.db('stock')

  const result = await work(db)

  client.close()
  return result
}

async function getBasic (symbol) {
  return query(async db => {
    const collection = await db.collection('basic')
    return collection.findOne({ symbol })
  })
}

async function searchStock (keyword) {
  return query(async db => {
    const collection = await db.collection('basic')
    const cursor = await collection.find({
      $or: [{
        symbol: {
          $regex: keyword
        }
      }, {
        name: {
          $regex: keyword
        }
      }]
    }).limit(30)
    return cursor.toArray()
  })
}

module.exports = {
  getBasic,
  searchStock
}
