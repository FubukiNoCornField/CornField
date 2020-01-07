import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export const plugins = [vuexLocal.plugin]

export const state = () => ({
  authorized: false
})

export const mutations = {
  change(state, val) {
    state.authorized = val
  }
}
