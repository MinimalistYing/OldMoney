<template>
  <div class='stock-search'>
    <input
      class='stock-search-input'
      v-model='keyword'
      @keyup='search'
      @focus='show = true'
      @blur='show = false'
      placeholder='股票代码 / 股票名称'
    />
    <transition name='slide-fade' mode='out-in'>
      <ul class='search-result' v-show='show && !isEmptyArray(result)'>
        <li
          class='search-result-item'
          v-for='data in result'
          :key='data._id'
          @click='$emit("select", data)'
        >
          <span>{{data.symbol}}</span>
          <span>{{data.name}}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import fetch from 'the-fetch'
import isEmptyArray from 'bape/isEmptyArray'

export default {
  name: 'StockSearch',
  data() {
    return {
      keyword: '',
      result: [],
      show: false
    }
  },
  methods: {
    search: function () {
      fetch.get('search-stock', {
        keyword: this.keyword.toUpperCase()
      }).then(res => this.result = res)
    },
    isEmptyArray
  }
}
</script>

<style lang='less'>
.stock-search {
  position: relative;
  display: inline-block;

  .stock-search-input {
    width: 110px;
    height: 30px;
    border: 1px solid #e91e63;
    border-radius: 8px;
    outline: 0;
    padding: 5px 10px;
    transition: all .5s;

    &:focus {
      width: 300px;
      border-color: transparent;
      box-shadow: 0px 3px 10px #ececec;
    }
  }

  .search-result {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    padding: 5px 5px;
    box-shadow: 0px 3px 10px #ececec;
    max-height: 250px;
    overflow: auto;
  }

  .search-result-item {
    display: flex;
    justify-content: space-between;
    margin: 6px 0;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      color: #e91e63;
    }
  }

  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateY(45px);
    opacity: 0;
  }
}
</style>
