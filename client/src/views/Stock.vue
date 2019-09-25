<template>
  <div class='about'>
    <h1>This is an about page</h1>
    <StockInfo />
  </div>
</template>

<script>
import fetch from 'the-fetch'
import StockInfo from '../components/StockInfo.vue'

export default {
  name: 'stock',
  components: {
    StockInfo
  },
  data() {
    return {
      info: {},
      pledge: {}
    }
  },
  methods: {
    onSelectStock (stock) {
      console.log(stock)
    }
  },
  beforeMount () {
    console.log(this.$route.params.id)
    fetch.get('share-pledge', {
      symbol: this.$route.params.id.slice(2)
    }).then(res => this.result = res)
  }
}
</script>
