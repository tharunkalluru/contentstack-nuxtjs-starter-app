<template>
  <footer>
    <div class="max-width footer-div">
      <div class="col-quarter">
        <NuxtLink
          aria-current="page"
          class="logo-tag"
          :title="footerData.title"
          to="/"
        >
          <img
            class="logo"
            :src="footerData.logo.url"
            :alt="footerData.title"
          />
        </NuxtLink>
      </div>
      <div class="col-half">
        <nav>
          <ul class="nav-ul">
            <template v-for="navItems in footerData.navigation.link">
              <li
                v-if="navItems.title"
                :key="navItems.title || 'key'"
                class="footer-nav-li"
              >
                <NuxtLink :to="navItems.href || '/'">
                  {{ navItems.title || '' }}
                </NuxtLink>
              </li>
            </template>
          </ul>
        </nav>
      </div>
      <div class="col-quarter social-link">
        <div class="social-nav">
          <a
            v-for="index in footerData.social.social_share"
            :key="index.title"
            :href="index.link.href"
            :title="index.title"
          >
            <img :src="index.icon.url" :alt="index.icon.title" />
          </a>
        </div>
      </div>
    </div>
    <div class="copyright" v-html="footerData.copyright" />
  </footer>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { onEntryChange } from '../plugins/contentstack'
import { FooterRes } from '~/typescript/response'
import { filterFooterLinks, getAllEntries, getFooter } from '~/helper'

export default {
  props: {
    footer: {
      required: true,
      type: Object as PropType<FooterRes>,
    },
  },
  data() {
    this.$store.commit('setFooter', this.footer)
    return {
      footerData: this.footer,
    }
  },
  mounted() {
    onEntryChange(async () => {
      if (process.env.CONTENTSTACK_LIVE_PREVIEW === 'true') {
        const response = await this.fetchData()
        this.footerData = response
        this.$store.commit('setFooter', response)
      }
    })
  },
  methods: {
    async fetchData() {
      const footer = await getFooter()
      const allEntries = await getAllEntries()
      const filteredLinks = filterFooterLinks(allEntries, footer)
      return filteredLinks
    },
  },
}
</script>
