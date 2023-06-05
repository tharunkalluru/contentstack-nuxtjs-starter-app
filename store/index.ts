// global store

import { BlogPost, Page } from "~/typescript/pages"
import { FooterRes, HeaderRes } from "~/typescript/response"

interface StateObject {
  header: HeaderRes
  footer: FooterRes
  page: Page | null
  blogPost: BlogPost | null
  blogList: BlogPost[] | null
}

export const state = () => ({
  header: null,
  footer: null,
  page: null,
  blogPost: null,
  blogList: null
})
export const mutations = {
  setHeader(stateObj: StateObject, data: HeaderRes) {
    stateObj.header = data
  },
  setFooter(stateObj: StateObject, data: FooterRes) {
    stateObj.footer = data
  },
  setPage(stateObj: StateObject, data: Page) {
    stateObj.page = data
  },
  setBlogPost(stateObj: StateObject, data: BlogPost) {
    stateObj.blogPost = data
  },
  setBlogList(stateObj: StateObject, data: BlogPost[]) {
    stateObj.blogList = data
  }
}
