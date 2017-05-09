import { combineReducers } from 'redux'
import { State } from 'jumpstate'

const GistState = State({
  initial: {
    list: [
      {
        id: '123abc',
        created_at: '2017-05-06T12:56:48Z',
        description: 'sample gist'
      },
      {
        id: '112244c',
        created_at: '2017-04-01T10:56:48Z',
        description: 'another gist'
      }
    ]
  }
})

export default combineReducers({
  gist: GistState
})
