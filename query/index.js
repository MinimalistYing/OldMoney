const source = require('./datasource')
const moment = require('moment')

exports.quote = async function (symbol) {
  const data = await source.quote(symbol)
  if (data.error_code === 0) { // 请求成功
    const { market, quote, others, tags } = data.data
    return {
      status: market.status, // 当前状态
      symbol: quote.symbol, // 股票代码
      name: quote.name, // 股票名称
      avg_price: quote.avg_price, // 当日平均价格
      current: quote.current, // 当前价
      high: quote.high, // 当日最高价
      low: quote.low, // 当日最低价
      percent: quote.percent, // 涨幅 跌幅
      limit_up: quote.limit_up, // 涨停
      limit_down: quote.limit_down, // 跌停
      pb: quote.pb, // 市净率
      pe_lyr: quote.pe_lyr, // 市盈率(静) 当前总市值除以去年一年总利润
      pe_ttm: quote.pe_ttm, // 滚动市盈率 当前总市值除以前四季度总利润
      pe_forecast: quote.pe_forecast, // 市盈率(动) 当前总市值除以今年预测总利润 不准！！
      high52w: quote.high52w, // 52周最高
      low52w: quote.low52w, // 52周最低
      last_close: quote.last_close, // 昨收
      open: quote.open, // 今开
      turnover_rate: quote.turnover_rate, // 换手率
      volume: quote.volume, // 成交量
      time: moment(quote.timestamp).format('YYYY-MM-DD HH:mm:ss'), // 当前行情的时间
      pankou_ratio: others.pankou_ratio, // 委比
      amplitude: quote.amplitude, // 振幅
      dividend: quote.dividend_yield, // 股息率
      float_market_capital: quote.float_market_capital, // 流通市值
      market_capital: quote.market_capital, // 总市值
      tags: tags.map(tag => tag.description).join(','), // 标签
      // 量比 股市开市后平均每分钟的成交量与过去5个交易日平均每分钟成交量之比
      // 量比为0.8-1.5倍，则说明成交量处于正常水平
      // 量比在1.5-2.5倍之间则为温和放量
      // 量比在2.5-5倍，则为明显放量
      // 量比达5-10倍，则为剧烈放量
      // 量比达到10倍以上的股票，一般可以考虑反向操作
      // 量比达到20倍以上的情形基本上每天都有一两单，是极端放量的一种表现
      volume_ratio: quote.volume_ratio
    }
  }
}

exports.pankou = async function (symbol) {
  const data = await source.pankou(symbol)
  const arr = data.split(',')
  return {
    open: arr[1], // 今开
    last_close: arr[2], // 昨收
    current: arr[3], // 当前价
    high: arr[3], // 最高
    low: arr[3], // 最低
    buy1: arr[11] + ' - ' + arr[10], // 买一
    buy2: arr[13] + ' - ' + arr[12], // 买二
    buy3: arr[15] + ' - ' + arr[14], // 买二
    buy4: arr[17] + ' - ' + arr[16], // 买二
    buy5: arr[19] + ' - ' + arr[18], // 买二
    sell1: arr[21] + ' - ' + arr[20], // 卖一
    sell2: arr[23] + ' - ' + arr[22], // 卖二
    sell3: arr[25] + ' - ' + arr[24], // 卖三
    sell4: arr[27] + ' - ' + arr[26], // 卖四
    sell5: arr[29] + ' - ' + arr[28] // 卖五
  }
}
