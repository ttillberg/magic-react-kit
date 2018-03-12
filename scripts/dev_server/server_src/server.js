import express from 'express'
import render_template from '../../common/server_entry/render_react_app'
import chalk from 'chalk'

const app = express()

const matchOnlyPageUrls = /.*(\/|\/[a-z0-9_-]+)$/

const renderOptions = {
  scriptHref: 'http://0.0.0.0:3001/bundle.js',
  stylesHref: null,
}

app.get(matchOnlyPageUrls, (req, res) => {
  let html = render_template(req.url)
    .then(state => {
      return render_template(req.url, renderOptions, state).then(htmlWithState => {
        res.setHeader('Cache-Control', 'public, max-age=60') // 1min for testing
        res.send(htmlWithState)
      })
    })
    .catch(e => {
      res
        .status(500)
        .send(
          `<html style="background: white;"><pre style="color:red; padding: 2em; font-size: 1.2em"><span style="font-size:5em">💣</span>\nserver side renderer\n--------------------\n\n\n${e.stack.replace(
            /(\(|\/).*(node_modules|webpack\:)/g,
            ''
          )}</pre></html>`
        )
      console.log(chalk.red(e.stack))
    })
})

export default app
