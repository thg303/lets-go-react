require('babel-register')(
  {
    presets: ['es2015', 'react', 'stage-2']
  }
)

const http = require('http')
const path = require('path')
const express = require('express')

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

app.server.listen(port)
console.log(`server is running at ${host}`)
