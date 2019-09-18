const request = require('./request')
const api = require('./API')

Object.keys(api).map(key => {
  if (key === 'pankou') { // 盘口是从新浪的接口获取 结构稍有不同
    exports[key] = symbol => request.get(api[key], symbol.toLowerCase(), {
      headers: { Host: 'hq.sinajs.cn' }
    })
  } else {
    exports[key] = (symbol, param) => request.get(api[key], {
      symbol,
      ...param
    })
  }
})
