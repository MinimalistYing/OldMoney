<template>
  <div class='about'>
    <StockInfo :info='info' :pledge='pledge' />
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
  },
  mounted () {
    fetch.get('share-pledge', {
      symbol: this.$route.params.id.slice(2)
    }).then(res => this.pledge = res)
    fetch.get('basic-realtime', {
      symbol: this.$route.params.id
    }).then(res => this.info = res)
  }
}
</script>
