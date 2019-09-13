const source = require('./datasource')
const moment = require('moment')

exports.quote = async function (symbol, param) {
  const data = await source.quote(symbol, param)
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
      pankou_scale: others.pankou_ratio, // 委比
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
      volume_scale: quote.volume_ratio
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

exports.margin = async function (symbol, param) {
  const data = await source.margin(symbol, param)
  if (data.error_code === 0) { // 请求成功
    return data.data.items.map(item => ({
      time: moment(item.td_date).format('YYYY-MM-DD HH:mm:ss'),
      margin_trading_buy_amt: item.margin_trading_buy_amt, // '融资买入'
      margin_trading_net_buy_amt: item.margin_trading_net_buy_amt, // '融资净买入'
      margin_trading_amt_balance: item.margin_trading_amt_balance, // '两融余额'
      margin_trading_balance: item.margin_trading_balance, // '融资余额'
      short_selling_amt_balance: item.short_selling_amt_balance // '融券余额'
    }))
  }
}

exports.flow = async function (symbol) {
  const data = await source.flow(symbol)
  if (data.error_code === 0) { // 请求成功
    return data.data.items.map(item => ({
      time: moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss'),
      realtime_flow_amount: item.amount // 今日实时资金流入或流出
    }))
  }
}

exports.blocktrans = async function (symbol, param) {
  const data = await source.blocktrans(symbol, param)
  if (data.error_code === 0) { // 请求成功
    return data.data.items.map(item => ({
      time: moment(item.td_date).format('YYYY-MM-DD HH:mm:ss'),
      volume: item.vol, // 成交量
      turn_valomn: item.trans_amt, // 成交额
      price: item.trans_price, // 成交价
      premium_rate: item.premium_rat, // 溢价率
      seller: item.sell_branch_org_name, // 卖方
      buyer: item.buy_branch_org_name // 买方
    }))
  }
}

exports.assort = async function (symbol) {
  let data = await source.assort(symbol)
  console.log(JSON.stringify(data))
  if (data.error_code === 0) { // 请求成功
    data = data.data
    return {
      capital_large: data.sell_large, // 大单流入/流出
      capital_medium: data.sell_medium, // 中单流入/流出
      capital_small: data.sell_small, // 小单流入/流出
      capital_total: data.sell_total, // 总资金流入/流出
      time: moment(data.timestamp).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}

exports.history = async function (symbol, param) {
  const data = await source.history(symbol, param)
  if (data.error_code === 0) { // 请求成功
    return data.data.items.map(item => ({
      time: moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss'),
      capital_total: item.amount // 总资金流入/流出
    }))
  }
}

exports.cashflow = async function (symbol, param) {
  const data = await source.cashflow(symbol, param)
  console.log(JSON.stringify(data))
  if (data.error_code === 0) { // 请求成功
    return data.data.list.map(item => ({
      time: moment(item.report_date).format('YYYY-MM-DD HH:mm:ss'),
      name: `${data.data.quote_name}${item.report_name}`,
      ncf_from_oa: item.ncf_from_oa[0], // 经营活动产生的现金流
      ncf_from_oa_ratio: item.ncf_from_oa[1], // 经营活动产生的现金流同比
      ncf_from_ia: item.ncf_from_ia[0], // 投资活动产生的现金流
      ncf_from_ia_ratio: item.ncf_from_ia[1], // 投资活动产生的现金流同比
      ncf_from_fa: item.ncf_from_fa[0], // 筹资活动产生的现金流
      ncf_from_fa_ratio: item.ncf_from_fa[1] // 筹资活动产生的现金流同比
    }))
  }
}

exports.indicator = async function (symbol, param) {
  const data = await source.indicator(symbol, param)
  if (data.error_code === 0) { // 请求成功
    return data.data.list.map(item => ({
      time: moment(item.report_date).format('YYYY-MM-DD HH:mm:ss'),
      name: `${data.data.quote_name}${item.report_name}`,
      roe: item.avg_roe[0], // 净资产收益率
      roe_ratio: item.avg_roe[1],
      np_per_share: item.np_per_share[0], // 每股净资产
      np_per_share_ratio: item.np_per_share[1],
      // 每股现金流为负时说明入不敷出
      operate_cash_flow_ps: item.operate_cash_flow_ps[0], // 每股现金流
      operate_cash_flow_ps_ratio: item.operate_cash_flow_ps[1],
      capital_reserve: item.capital_reserve[0], // 每股资本公积金
      capital_reserve_ratio: item.capital_reserve[1],
      undistri_profit_ps: item.undistri_profit_ps[0], // 每股未分配利润
      undistri_profit_ps_ratio: item.undistri_profit_ps[1],
      net_selling_rate: item.net_selling_rate[0], // 净利率
      net_selling_rate_ratio: item.net_selling_rate[1]
    }))
  }
}

exports.balance = async function (symbol, param) {
  const data = await source.balance(symbol, param)
  if (data.error_code === 0) { // 请求成功
    return data.data.list.map(item => ({
      time: moment(item.report_date).format('YYYY-MM-DD HH:mm:ss'),
      name: `${data.data.quote_name}${item.report_name}`,
      assets: item.total_assets[0], // 资产
      assets_ratio: item.total_assets[1],
      liabilities: item.total_liab[0], // 负债
      liabilities_ratio: item.total_liab[1],
      asset_liab: item.asset_liab_ratio[0], // 负债率
      asset_liab_ratio: item.asset_liab_ratio[1]
    }))
  }
}

exports.income = async function (symbol, param) {
  const data = await source.income(symbol, param)
  if (data.error_code === 0) { // 请求成功
    return data.data.list.map(item => ({
      time: moment(item.report_date).format('YYYY-MM-DD HH:mm:ss'),
      name: `${data.data.quote_name}${item.report_name}`,
      profit: item.op[0], // 营业利润
      profit_ratio: item.op[1],
      income: item.total_revenue[0], // 营业总收入
      income_ratio: item.total_revenue[1]
    }))
  }
}

exports.business = async function (symbol, param) {
  const data = await source.business(symbol, param)
  if (data.error_code === 0) { // 请求成功
    return data.data.list.map(item => ({
      time: moment(item.report_date).format('YYYY-MM-DD HH:mm:ss'),
      name: `${data.data.quote_name}${item.report_name}`,
      list: item.class_list // @TODO 暂时不作解析
    }))
  }
}

exports.skholderchg = async function (symbol, param) {
  const data = await source.skholderchg(symbol, param)
  if (data.error_code === 0) { // 请求成功
    return data.data.items.map(item => ({
      name: item.name,
      symbol: item.symbol,
      time: item.chg_date,
      volume: item.chg_shares_num, // 成交量
      price: item.trans_avg_price, // 成交价
      turn_valomn: item.chg_shares_num * item.trans_avg_price, // 成交额
      duty: item.duty // 职位
    }))
  }
}

exports.holders = async function (symbol, param) {
  const data = await source.holders(symbol, param)
  if (data.error_code === 0) { // 请求成功
    return data.data.items.map(item => ({
      holder: item.holder_num, // 股东数
      ashare_holder: item.ashare_holder, // A股股东数
      hshare_holder: item.hshare_holder, // B股股东数
      time: moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss'),
      change: item.chg, // 较上期变动
      price: item.price
    }))
  }
}

exports.bonus = async function (symbol, param) {
  const data = await source.bonus(symbol, param)
  console.log(JSON.stringify(data))
  if (data.error_code === 0) { // 请求成功
    return data.data.items.map(item => ({
      name: item.dividend_year,
      dividend_plan: item.plan_explain // 分红计划
    }))
  }
}
