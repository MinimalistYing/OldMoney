const query = require('./query')
const log = require('./log')

const symbol = process.argv[2] // 股票代码

query.quote(symbol, {
  extend: 'detail'
}).then(log)
// query.pankou(symbol).then(log)

// query.margin(symbol, {
//   page: 1,
//   size: 10
// }).then(log)
// query.flow(symbol).then(log)
// query.blocktrans(symbol).then(log)
// query.assort(symbol).then(log)
// query.history(symbol, {
//   count: 10
// }).then(log)

// query.cashflow(symbol, {
//   is_annals: 0,
//   count: 10
// }).then(log)
// query.indicator(symbol, {
//   is_annals: 0,
//   count: 10
// }).then(log)
// query.balance(symbol, {
//   is_annals: 0,
//   count: 10
// }).then(log)
// query.income(symbol, {
//   is_annals: 0,
//   count: 10
// }).then(log)
// query.business(symbol, {
//   is_annals: 0,
//   count: 10
// }).then(log)

// query.skholderchg(symbol, {
//   extend: true,
//   page: 1,
//   size: 50
// }).then(log)
// query.holders(symbol, {
//   extend: true,
//   page: 1,
//   size: 50
// }).then(log)
// query.bonus(symbol, {
//   page: 1,
//   size: 50
// }).then(log)
// query.change(symbol, {
//   count: 50
// }).then(log)
// query.top(symbol).then(log)
