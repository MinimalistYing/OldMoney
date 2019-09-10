const query = require('./query')

query.quote('SH601519').then(data => console.log(data))
query.pankou('SH601519').then(data => console.log(data))
