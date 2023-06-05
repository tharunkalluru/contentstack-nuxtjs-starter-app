<template>
  <main
    v-if="components"
    :data-pageref="entryUid"
    data-contenttype="page"
    :data-locale="locale"
  >
    <template v-for="(component, index) in components">
      <HeroBanner
        v-if="component.hero_banner && page !== 'Blog'"
        :key="'hero_banner' + index"
        title="home-content"
        :data="component.hero_banner"
      />
      <BlogBanner
        v-if="component.hero_banner && page === 'Blog'"
        :key="'hero_banner' + index"
        title="about-content"
        :data="component.hero_banner"
      />
      <SectionComponents
        v-if="component.section"
        :key="'section' + index"
        :data="component.section"
      />
      <BlogSection
        v-if="component.from_blog"
        :key="'from_blog' + index"
        :data="component.from_blog"
      />
      <SectionWithCards
        v-if="component.section_with_cards"
        :key="'section_with_cards' + index"
        :data="component.section_with_cards"
      />
      <SectionWithBuckets
        v-if="component.section_with_buckets && page === 'Home'"
        :key="'section_with_buckets' + index"
        :data="component.section_with_buckets"
      />
      <AboutSectionBucket
        v-else-if="component.section_with_buckets && page === 'About Us'"
        :key="'section_with_buckets' + index"
        :data="component.section_with_buckets"
      />
      <TeamSection
        v-if="component.our_team"
        :key="'our_team' + index"
        :data="component.our_team"
      />
      <SectionWithEmbedObject
        v-if="component.section_with_html_code && page === 'Contact Us'"
        :key="'section_with_html_code' + index"
        :data="component.section_with_html_code"
      />
      <SectionWithEmbedObject
        v-if="component.section_with_html_code && page !== 'Contact Us'"
        :key="'section_with_html_code' + index"
        :data="component.section_with_html_code"
      />
    </template>
  </main>
</template>

<script lang="ts">
import { PropType } from "vue"
import BlogSection from '../components/BlogSection.vue'
import BlogBanner from '../components/BlogBanner.vue'
import AboutSectionBucket from '../components/AboutSectionBucket.vue'
import SectionWithBuckets from '../components/SectionWithBuckets.vue'
import SectionWithEmbedObject from '../components/SectionWithEmbedObject.vue'
import TeamSection from '../components/TeamSection.vue'
import SectionWithCards from '../components/SectionWithCards.vue'
import HeroBanner from '../components/HeroBanner.vue'
import type {ComponentsProps} from "../typescript/pages"
import SectionComponents from './SectionComponent.vue'

export default {
  components: {
    HeroBanner,
    BlogBanner,
    SectionComponents,
    SectionWithBuckets,
    AboutSectionBucket,
    SectionWithCards,
    TeamSection,
    BlogSection,
    SectionWithEmbedObject,
  },
  props: {
    components: {
      required: true,
      type: Array as PropType<ComponentsProps[]>
    },
    page: {
      required: true,
      type: String
    },
    entryUid: {
      required: true,
      type: String
    },
    locale: {
      required: true,
      type: String
    }
  }
}
</script>
