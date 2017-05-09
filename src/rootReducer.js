import { combineReducers } from 'redux'
import GistState from './states'

export default combineReducers({
  gist: GistState
})
