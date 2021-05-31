import defaultState from '~/assets/defaultState.json'

export const state = () => ({ ...defaultState })

export const getters = {
  get: state => (parent, child) => {
    return parent.split('.').reduce((p, c) => (p && p[c]) || null, state)[child]
  }
}

export const mutations = {
  updateState (state, content) {
    content.parent.split('.').reduce((p, c) => (p && p[c]) || null, state)[content.child] = content.value
  },
  clear (state) {
    state = { ...defaultState }
  }
}
