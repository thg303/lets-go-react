import { State, Effect, Actions } from 'jumpstate'
import axios from 'axios'

const GistState = State({
  initial: {
    list: [],
    currentGist: null
  },
  setGistList (state, payload) {
    return {
      ...state,
      list: payload
    }
  },
  setCurrentGist (state, payload) {
    return {
      ...state,
      currentGist: payload
    }
  }
})

//eslint-disable-next-line
const listGistsEffect = Effect('listGists', () => {
  return axios.get('https://api.github.com/gists/public').then((res) => {
    Actions.setGistList(res.data)
    return res
  })
})

//eslint-disable-next-line
const loadGistEffect = Effect('loadGist', (id) => {
  return axios.get(`https://api.github.com/gists/${id}`).then((res) => {
    Actions.setCurrentGist(res.data)
    return res
  })
})

export default GistState
