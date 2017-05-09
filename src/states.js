import { State, Effect, Actions } from 'jumpstate'
import axios from 'axios'

const GistState = State({
  initial: {
    list: []
  },
  setGistList (state, payload) {
    return {
      ...state,
      list: payload
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

export default GistState
