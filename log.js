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

module.exports = log
