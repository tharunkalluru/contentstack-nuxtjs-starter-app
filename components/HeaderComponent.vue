<template>
  <header class="header">
    <template v-if="headerData.notification_bar">
      <div
        v-if="headerData.notification_bar.show_announcement"
        class="note-div"
      >
        <span v-html="headerData.notification_bar.announcement_text" />
      </div>
    </template>
    <div class="max-width header-div">
      <div v-if="headerData.uid" class="wrapper-logo">
        <NuxtLink
          aria-current="page"
          class="logo-tag"
          :title="headerData.title|| ''"
          to="/"
        >
          <img
            class="logo"
            :src="headerData.logo.url"
            :alt="headerData.title || 'logo'"
          />
        </NuxtLink>
      </div>
      <input id="menu-btn" type="checkbox" class="menu-btn" />
      <label class="menu-icon" for="menu-btn">
        <span class="navicon" />
      </label>
      <nav class="menu">
        <ul v-if="headerData.navigation_menu.length" class="nav-ul header-ul">
          <template v-for="navItems in headerData.navigation_menu">
            <li
              v-if="navItems.label"
              :key="navItems.label || 'key'"
              class="nav-li"
            >
              <NuxtLink :to="navItems?.page_reference[0]?.url || '/'">
                {{ navItems.label || '' }}
              </NuxtLink>
            </li>
          </template>
        </ul>
      </nav>
      <div class="json-preview">
        <Tooltip content="JSON Preview" direction="top"></Tooltip>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { onEntryChange } from '../plugins/contentstack'
import Tooltip from './ToolTip.vue'
import { HeaderRes } from '~/typescript/response'
import { filterHeaderNav, getAllEntries, getHeader } from '~/helper'

export default {
  components: {
    Tooltip,
  },
  props: {
    header: {
      required: true,
      type: Object as PropType<HeaderRes>,
    },
  },
  data() {
     this.$store.commit('setHeader', this.header)
    return {
      headerData: this.header,
    }
  },
  mounted() {
    onEntryChange(() => {
      if (process.env.CONTENTSTACK_LIVE_PREVIEW === 'true') {
        this.fetchData().then((res: HeaderRes[]) => {
          this.headerData = res
          this.$store.commit('setHeader', res)
        })
      }
    })
  },
  methods: {
    fetchData: async (): Promise<HeaderRes> => {
      const result = await getHeader()
      const responsePages = await getAllEntries()
      const newHeaderRes = filterHeaderNav(responsePages, result)
      return newHeaderRes
    },
  },
}
</script>
