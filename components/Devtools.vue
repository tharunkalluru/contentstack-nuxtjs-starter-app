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
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="staticBackdropLabel" class="modal-title">Json Response</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <pre v-if="this.response" id="jsonViewer">
            <json-viewer
              :value="this.response"
               copyable
              >
              </json-viewer>
          </pre>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn primary-btn" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import JsonViewer from 'vue-json-viewer/ssr'
import 'vue-json-viewer/style.css'
export default {
  components: { JsonViewer },
  data() {
    const { header, footer, page, blogPost } = this.$store.state
    return {
      response: {
        headers: header ? header : null,
        footer: footer ? footer : null,
        page: page || null,
        blogpost: blogPost || null,
      },
    }
  },
}
</script>
