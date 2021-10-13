// global store

export const state = () => ({
  header: null,
  footer: null,
  page:null,
  blogPost:null
})
export const mutations = {
  setHeader(state, data) {
    state.header = data
  },
  setFooter(state, data) {
    state.footer = data
  },
  setPage(state,data){
    state.page = data
  },
  setBlogpost(state,data){
    state.blogPost = data
  }
}
