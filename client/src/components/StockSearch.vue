<template>
  <div class='stock-search'>
    <input
      class='stock-search-input'
      v-model='keyword'
      @change='search'
      placeholder='股票代码 / 股票名称'
    />
  </div>
</template>

<script>
export default {
  name: 'StockSearch',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    search: function () {
      console.log(this.keyword)
    }
  }
}
</script>

<style lang='less'>
.stock-search {
  .stock-search-input {
    width: 300px;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 10px;
    outline: 0;
    padding: 5px 10px;
  }
}
</style>
