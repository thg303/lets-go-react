import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { CreateJumpstateMiddleware } from 'jumpstate'
import { Provider } from 'react-redux'
import rootReducer from './rootReducer'
import routes from './routes'
import './index.css'

const initialState = {}

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(CreateJumpstateMiddleware()), window.devToolsExtension && (process.env.NODE_ENV !== 'production') ? window.devToolsExtension() : f => f)
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
