import express from 'express'

import render from './render'

const app = express()

app.get('*', (req, res) => {
  let html = render(req, 'http://localhost:3001/bundle.js')
  res.send(html)
})

export default app
