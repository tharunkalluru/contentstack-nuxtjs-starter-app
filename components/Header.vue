<template>
  <header class="header">
    <template
      v-if="this.$store.state.header.notification_bar.show_announcement"
    >
      <div class="note-div">
        <span
          v-html="
            this.$store.state.header.notification_bar.announcement_text
          "
        />
        <span
          class="devtools"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          <i class="fas fa-tools fa-lg" />
        </span>
      </div>
    </template>
    <div class="max-width header-div">
      <div class="wrapper-logo">
        <NuxtLink
          aria-current="page"
          class="logo-tag"
          :title="this.$store.state.header.title"
          to="/"
          ><img
            class="logo"
            :src="this.$store.state.header.logo.url"
            :alt="this.$store.state.header.title"
        /></NuxtLink>
      </div>
      <input type="checkbox" class="menu-btn" id="menu-btn" /><label
        class="menu-icon"
        for="menu-btn"
        ><span class="navicon"></span
      ></label>
      <nav class="menu">
        <ul class="nav-ul header-ul">
            <li
              class="nav-li"
              v-for="navItems in this.$store.state.header.navigation_menu"
              :key="navItems.title"
            >
              <NuxtLink :to="navItems.page_reference[0].url">{{
                navItems.page_reference[0].title
              }}</NuxtLink>
            </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import Stack from '../plugins/contentstack'
export default {
  async fetch() {
    this.data = await Stack.getEntries(
      'header',
      `navigation_menu.page_reference`
    )
    this.$store.commit('setHeader', this.data[0])
  },
}
</script>
