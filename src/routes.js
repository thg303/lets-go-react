import React from 'react'
import { Route } from 'react-router'

import App from './components/App'
import ListScreen from './components/ListScreen'
import ShowScreen from './components/ShowScreen'

export default (
  <Route path="/" component={App}>
    <Route path="list" component={ListScreen} />
    <Route path="gist/:id" component={ShowScreen} />
  </Route>
)
