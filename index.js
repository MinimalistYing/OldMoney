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
// query.quote('SH601988').then(log)
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
query.income('SH601988', {
  is_annals: 0,
  count: 10
}).then(log)
// query.business('SH601988').then(data => console.log(data))

// query.skholderchg('SH601988').then(data => console.log(data))
// query.skholder('SH601988').then(data => console.log(data))
// query.industry('SH601988').then(data => console.log(data))
// query.holders('SH601988').then(data => console.log(data))
// query.bonus('SH601988').then(data => console.log(data))
// query.change('SH601988').then(data => console.log(data))
// query.compare('SH601988').then(data => console.log(data))
// query.analysis('SH601988').then(data => console.log(data))
// query.shareschg('SH601988').then(data => console.log(data))
// query.top('SH601988').then(data => console.log(data))
// query.mainindicator('SH601988').then(data => console.log(data))

// query.all('SH601519').then(data => console.log(data))
