import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router'
import { Helmet } from 'react-helmet'

class App extends Component {
  render () {
    return (
      <div className="App">
        <Helmet>
          <title>welcome</title>
        </Helmet>
        <div className="App-header">
          <img src="/logo.svg" className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <ul className="App-intro">
          <li><Link to="/">home</Link></li>
          <li><Link to="/list">show list</Link></li>
        </ul>
        <hr />
        {this.props.children}
      </div>
    )
  }
}

export default App
