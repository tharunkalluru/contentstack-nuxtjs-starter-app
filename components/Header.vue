<template>
  <header class="header">
    <template v-if="$store.state.header.notification_bar.show_announcement">
      <div class="note-div">
        <span v-html="$store.state.header.notification_bar.announcement_text" />
        <span
          class="devtools"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          <img
            src="../static/Devtools.gif"
            alt="Dev tools icon"
            title="Json Preview"
          />
        </span>
      </div>
    </template>
    <div class="max-width header-div">
      <div class="wrapper-logo">
        <NuxtLink
          aria-current="page"
          class="logo-tag"
          :title="$store.state.header.title"
          to="/"
        >
          <img
            class="logo"
            :src="$store.state.header.logo.url"
            :alt="$store.state.header.title"
          />
        </NuxtLink>
      </div>
      <input id="menu-btn" type="checkbox" class="menu-btn" /><label
        class="menu-icon"
        for="menu-btn"
        ><span class="navicon"
      /></label>
      <nav class="menu">
        <ul class="nav-ul header-ul">
          <li
            v-for="navItems in $store.state.header.navigation_menu"
            :key="navItems.title"
            class="nav-li"
          >
            <NuxtLink :to="navItems.page_reference[0].url">
              {{ navItems.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import Stack from '../plugins/contentstack'
import { onEntryChange } from '../plugins/contentstack'

export default {
  async fetch() {
    this.data = await Stack.getEntries({
      contentTypeUid: 'header',
      referenceFieldPath: `navigation_menu.page_reference`,
      jsonRtePath: ['notification_bar.announcement_text'],
    })
    this.$store.commit('setHeader', this.data[0])
  },
  mounted() {
    onEntryChange(async () => {
      if (process.env.CONTENTSTACK_LIVE_PREVIEW === 'true') {
        const response = await this.fetchData()
        this.$store.commit('setHeader', response[0])
      }
    })
  },
  methods: {
    async fetchData() {
      const result = await Stack.getEntries({
        contentTypeUid: 'header',
        referenceFieldPath: `navigation_menu.page_reference`,
        jsonRtePath: ['notification_bar.announcement_text'],
      })
      return result
    },
  },
}
</script>
