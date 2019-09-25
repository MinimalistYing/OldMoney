<template>
  <div class='home'>
    <StockSearch @select='onSelectStock' />
  </div>
</template>

<script>
import fetch from 'the-fetch'
import StockSearch from '../components/StockSearch.vue'

export default {
  name: 'home',
  components: {
    StockSearch
  },
  data() {
    return {
      stock: {}
    }
  },
  methods: {
    onSelectStock (stock) {
      this.$router.push({
        path: `stock/${stock.symbol}`
      })
    }
  }
}
</script>
