require('babel-register')(
  {
    presets: ['es2015', 'react', 'stage-2'],
    plugins: [
      ['babel-plugin-transform-require-ignore', { extensions: ['.svg', '.css'] }]
    ]
  }
)

const http = require('http')
const path = require('path')
const express = require('express')
const React = require('react')
const ReactRouter = require('react-router')
const ReactDOMServer = require('react-dom/server')
const fs = require('fs')

const { createLocation } = require('history')
const routes = require('../src/routes').default

const port = process.env.PORT || 8585
const host = process.env.VIRTUAL_HOST || `localhost:${port}`

const staticFiles = [
  '/static/*',
  '/favicon.ico',
  '/logo.svg',
  '/asset-manifest.json'
]

const app = express()
app.server = http.createServer(app)
app.use(express.static('../build'))

staticFiles.forEach((file) => {
  app.get(file, (req, res) => {
    const filePath = path.join(__dirname, '../build', req.url)
    res.sendFile(filePath)
  })
})

app.get('*', function (req, res) {
  const aLocation = createLocation(req.url)
  const showError = (e = {}) => res.status(404).send(`404: ${e.message ? e.message : 'wrong url'}`)

  ReactRouter.match({routes, location: aLocation}, function (err, redirect, ssrData) {
    if (err) {
      return showError(err)
    }
    if (redirect) {
      return redirect(302, redirect.pathname + redirect.search)
    }
    if (ssrData) {
      const reactApp = React.createElement(ReactRouter.RouterContext, ssrData)

      const htmlPath = path.join(__dirname, '../build', 'index.html')
      fs.readFile(htmlPath, 'utf-8', (err, htmlData) => {
        if (err) { return showError(Error('no html file found')) }
        const renderedApp = htmlData.replace('<var id="SSR"></var>', ReactDOMServer.renderToString(reactApp))
        res.status(200).send(renderedApp)
      })
    } else {
      return showError(Error('no page found'))
    }
  })
})

app.server.listen(port)
console.log(`server is running at ${host}`)
