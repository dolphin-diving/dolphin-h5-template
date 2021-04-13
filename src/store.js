import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  appVersion: ''
  },
  getters: {
    appVersion: state => state.appVersion
  },
  mutations: {
	updateAppVersion(state, appVersion) {
	  state.appVersion = appVersion;
	}
  }
})
