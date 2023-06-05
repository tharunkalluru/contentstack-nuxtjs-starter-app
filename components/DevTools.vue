<template>
  <div
    id="staticBackdrop"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabIndex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="staticBackdropLabel" class="modal-title">JSON Preview</h2>
          <div
            class="tooltip-wrapper"
            @click="copyObject(JSON.stringify(response))"
          >
            <div class="tooltip-copy">
              <img src="../static/copy.svg" class="copyIcon" alt="copy icon" />
              <div v-if="componentKey > 0" class="tooltip-top-copy">
                {{ messageCopied }}
              </div>
              <div v-else class="tooltip-top-copy">
                {{ messageCopy }}
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <pre id="jsonViewer">
            <json-viewer
              :value="response"
              :expand-depth=1
               :copyable="false"
              >
              </json-viewer>

          </pre>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import JsonViewer from 'vue-json-viewer/ssr'
import 'vue-json-viewer/style.css'
import { filterObject } from '~/helper'
import { BlogPost, Page } from "~/typescript/pages"
import { FooterRes, HeaderRes } from "~/typescript/response"

interface Response {
  page?: Page
  blog_post?: BlogPost
  headers: HeaderRes
  footer: FooterRes
  blogList?:BlogPost[]
}

export default {
  components: { JsonViewer },
  data() {
    const { header, footer, page, blogPost, blogList } = this.$store.state
    let response: Response = {
      headers: header || null,
      footer: footer || null,
    }
    page && (response.page = page)
    blogPost && (response.blog_post = blogPost)
    blogList && (response.blogList = blogList)
    response = filterObject(response)
    return {
      response,
      messageCopy: 'Copy',
      messageCopied: 'Copied',
      componentKey: 0,
    }
  },
  updated() {
    this.componentKey &&
      setTimeout(() => {
        this.componentKey = 0
      }, 300)
  },
  methods: {
    copyObject(response:string) {
      navigator.clipboard.writeText(response)
      this.componentKey++
    },
  },
}
</script>
