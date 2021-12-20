<template>
  <footer>
    <div class="max-width footer-div">
      <div class="col-quarter">
        <NuxtLink
          aria-current="page"
          class="logo-tag"
          :title="$store.state.footer.title"
          to="/"
        >
          <img
            class="logo"
            :src="$store.state.footer.logo.url"
            :alt="$store.state.footer.title"
          >
        </NuxtLink>
      </div>
      <div class="col-half">
        <nav>
          <ul class="nav-ul">
            <li
              v-for="navItems in $store.state.footer.navigation.link"
              :key="navItems.title"
              class="footer-nav-li"
            >
              <NuxtLink :to="navItems.href">
                {{ navItems.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-quarter social-link">
        <div class="social-nav">
          <template
            v-for="index in $store.state.footer.social.social_share"
          >
            <NuxtLink
              :key="index.title"
              :to="index.link.href"
              :title="index.title"
            >
              <img :src="index.icon.url" :alt="index.icon.title">
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
    <div class="copyright" v-html="$store.state.footer.copyright" />
  </footer>
</template>

<script>
import Stack from '../plugins/contentstack'

export default {
  async fetch() {
    this.data = await Stack.getEntries({contentTypeUid:'footer',jsonRtePath:["copyright"]})
    this.$store.commit('setFooter', this.data[0])
  },
}
</script>
