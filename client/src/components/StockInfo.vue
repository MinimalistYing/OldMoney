<template>
  <div class='stock-info'>
    <div class='basic'>
    </div>
    <div class='pledge box'>
      <h2>股票质押率走势</h2>
      <v-chart :options='pledgeLine' theme='oldmoney'  />
    </div>
  </div>
</template>

<script>
import fetch from 'the-fetch'

export default {
  name: 'StockInfo',
  methods: {

  },
  props: {
    pledge: {
      type: Object
    },
    info: {
      type: Object
    }
  },
  computed: {
    pledgeLine() {
      const data = this.pledge.MoreData ? this.pledge.MoreData.reverse() : []
      return {
        xAxis: {
          type: 'category',
          data: data.map(item => item.date)
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
            trigger: 'axis'
        },
        series: [{
          data: data.map(item => item.value),
          type: 'line'
        }]
      }
    }
  }
}
</script>

<style lang='less'>
.stock-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .pledge {
    width: 66vw;
    height: 480px;
  }

  .box {
    padding: 10px 20px 80px;
    border-radius: 15px;
    box-shadow: 0px 3px 10px #ececec;

    h2 {
      text-align: left;
      font-weight: normal;
    }
  }
}
</style>
