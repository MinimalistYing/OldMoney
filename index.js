const query = require('./query')
const ALIAS = require('./const').ALIAS

function log (data) {
  if (Array.isArray(data)) {
    for (const o of data) {
      Object.keys(o).map(key => {
        let suffix = ''
        const origin = key
        if (key.endsWith('_ratio')) {
          key = key.slice(0, key.length - 6)
          suffix = '同比'
        }
        const label = ALIAS[key] || key
        console.log(label + suffix + ': ' + o[origin])
      })
    }
  } else {
    Object.keys(data).map(key => {
      let suffix = ''
      const origin = key
      if (key.endsWith('_ratio')) {
        key = key.slice(0, key.length - 6)
        suffix = '同比'
      }
      const label = ALIAS[key] || key
      console.log(label + suffix + ': ' + data[origin])
    })
  }
}

// query.quote('SH601988', {
//   extend: 'detail'
// }).then(log)
// query.pankou('SH601988').then(log)

// query.margin('SH601988', {
//   page: 1,
//   size: 10
// }).then(log)
// query.flow('SH601988').then(log)
// query.blocktrans('SH601988').then(log)
// query.assort('SH601988').then(log)
// query.history('SH601988', {
//   count: 100
// }).then(log)

// query.cashflow('SH601988', {
//   is_annals: 0,
//   count: 10
// }).then(log)
// query.indicator('SH601988', {
//   is_annals: 0,
//   count: 10
// }).then(log)
// query.balance('SH601988', {
//   is_annals: 0,
//   count: 10
// }).then(log)
// query.income('SH601988', {
//   is_annals: 0,
//   count: 10
// }).then(log)
// query.business('SH601113', {
//   is_annals: 0,
//   count: 10
// }).then(log)

// query.skholderchg('SH600598', {
//   extend: true,
//   page: 1,
//   size: 50
// }).then(log)
// query.holders('SH601988', {
//   extend: true,
//   page: 1,
//   size: 50
// }).then(log)
// query.bonus('SH601988', {
//   page: 1,
//   size: 50
// }).then(log)
// query.change('SH601988', {
//   count: 50
// }).then(log)
// query.top('SH601988').then(log)

query.all('SH601519').then(log)
