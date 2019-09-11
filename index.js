const query = require('./query')
const ALIAS = require('./const').ALIAS

function log (data) {
  Object.keys(data).map(key => {
    const label = ALIAS[key] || key
    console.log(label + ': ' + data[key])
  })
}
query.quote('SH601988').then(data => log(data))
// query.pankou('SH601519').then(data => console.log(data))

// query.margin('SH601519').then(data => console.log(data))
// query.flow('SH601519').then(data => console.log(data))
// query.blocktrans('SH601519').then(data => console.log(data))
// query.assort('SH601519').then(data => console.log(data))
// query.history('SH601519').then(data => console.log(data))

// query.cashflow('SH601519').then(data => console.log(data))
// query.indicator('SH601519').then(data => console.log(data))
// query.balance('SH601519').then(data => console.log(data))
// query.income('SH601519').then(data => console.log(data))
// query.business('SH601519').then(data => console.log(data))

// query.skholderchg('SH601519').then(data => console.log(data))
// query.skholder('SH601519').then(data => console.log(data))
// query.industry('SH601519').then(data => console.log(data))
// query.holders('SH601519').then(data => console.log(data))
// query.bonus('SH601519').then(data => console.log(data))
// query.change('SH601519').then(data => console.log(data))
// query.compare('SH601519').then(data => console.log(data))
// query.analysis('SH601519').then(data => console.log(data))
// query.shareschg('SH601519').then(data => console.log(data))
// query.top('SH601519').then(data => console.log(data))
// query.mainindicator('SH601519').then(data => console.log(data))

// query.all('SH601519').then(data => console.log(data))
