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
          />
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
          <template v-for="index in $store.state.footer.social.social_share">
            <NuxtLink
              :key="index.title"
              :to="index.link.href"
              :title="index.title"
            >
              <img :src="index.icon.url" :alt="index.icon.title" />
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
    <div class="copyright" v-html="$store.state.footer.copyright" />
  </footer>
</template>

<script lang="ts">

import Stack, { onEntryChange } from '../plugins/contentstack'
import Links from '../typescript/data'

interface PageResponse {
  title: string;
  url: string;
}

export default {
  async fetch () {
    const response = await this.fetchData()
    this.$store.commit('setFooter', response[0])
  },
  mounted () {
    onEntryChange(async () => {
      if (process.env.CONTENTSTACK_LIVE_PREVIEW === 'true') {
        const response = await this.fetchData()
        this.$store.commit('setFooter', response[0])
      }
    })
  },
  methods: {
    async fetchData () {
      const result = await Stack.getEntries({
        contentTypeUid: 'footer',
        jsonRtePath: ['copyright']
      })
      const responsePages: [PageResponse] = await Stack.getEntries({
        contentTypeUid: 'page'
      })
      const navFooterList = result[0].navigation.link
      if (responsePages.length !== result.length) {
        responsePages.forEach((entry) => {
          const fFound = result[0].navigation.link.find(
            (link: Links) => link.title === entry.title
          )
          if (!fFound) {
            navFooterList.push({ title: entry.title, href: entry.url })
          }
        })
      }
      result[0].navigation.link = navFooterList
      return result
    }
  }
}
</script>
