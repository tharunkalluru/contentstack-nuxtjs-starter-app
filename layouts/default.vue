<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script lang="ts">
import Header from '../components/HeaderComponent.vue'
import Footer from '../components/FooterComponent.vue'
export default {
  components: {
    Header,
    Footer,
  },
}
</script>
