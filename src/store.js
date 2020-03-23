import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projectList: [],
    activeProject: null,
    files: [],
    activeFile: null
  },
  mutations: {
    ADD_PROJECT (state, projectPath) {
      if (state.projectList.indexOf(projectPath) !== -1) {
        let plist = [...state.projectList]
        plist.push(projectPath)
        state.projectList = plist
      }
    },
    ACTIVATE_PROJECT (state, projectPath) {
      if (state.projectList.indexOf(projectPath) !== -1) {
        state.activeProject = projectPath
      }
    },
    SET_FILES (state, files) {
      state.files = files
    },
    SET_ACTIVE_FILE (state, path) {
      let file = state.files.filter((file) => { return file.path === path })

      if (file.length > 0) {
        state.activeFile = path
      } else {
        state.activeFile = null
      }
    },
    REMOVE_FILE (state, path) {
      let files = state.files.filter((file) => { return file.path !== path })
      state.files = [...files]
    },
    ADD_FILE (state, file) {
      let files = state.files.filter((f) => { return f.path !== file.path })
      files.push(file)
      state.files = [...files]
    }
  },
  actions: {
    addProject ({ commit }, path) {
      commit('ADD_PROJECT', path)
      commit('ACTIVATE_PROJECT', path)
    },
    setFiles ({ commit, state }, arr) {
      commit('SET_FILES', arr)
    },
    activateProject ({ commit }, path) {
      commit('ACTIVATE_PROJECT', path)
    },
    setActiveFile ({ commit }, path) {
      commit('SET_ACTIVE_FILE', path)
    },
    removeFile ({ commit }, path) {
      commit('REMOVE_FILE', path)
    },
    addFile ({ commit }, file) {
      commit('ADD_FILE', file)
    }
  },
  getters: {
    projectList: state => {
      return state.projectList
    },
    activeProject: state => {
      return state.activeProject
    },
    files: state => {
      return state.files
    },
    meiFiles: state => {
      let files = state.files.filter((file) => { return file.category === 'MEI' })

      files.sort((a, b) => (a.short > b.short) ? 1 : ((b.short > a.short) ? -1 : 0))
      return files
    },
    teiFiles: state => {
      let files = state.files.filter((file) => { return file.category === 'TEI' })

      files.sort((a, b) => (a.short > b.short) ? 1 : ((b.short > a.short) ? -1 : 0))
      return files
    },
    svgFiles: state => {
      let files = state.files.filter((file) => { return file.category === 'SVG' })

      files.sort((a, b) => (a.short > b.short) ? 1 : ((b.short > a.short) ? -1 : 0))
      return files
    },
    imgFiles: state => {
      let files = state.files.filter((file) => { return file.category === 'img' })

      files.sort((a, b) => (a.short > b.short) ? 1 : ((b.short > a.short) ? -1 : 0))
      return files
    },
    otherFiles: state => {
      let files = state.files.filter((file) => { return file.category === 'other' })

      files.sort((a, b) => (a.short > b.short) ? 1 : ((b.short > a.short) ? -1 : 0))
      return files
    },
    activeFile: state => {
      if (state.activefile === null) {
        return null
      }
      let file = state.files.filter((file) => { return file.path === state.activeFile })[0]
      return file
    },
    activeFilePath: state => {
      return state.activeFile
    }
  }
})
