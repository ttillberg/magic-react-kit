const render_template = require('../../../lib/server_entry/render_react_app').default

const renderOptions = {
  scriptHref: '/client.js',
  stylesHref: null,
}

module.exports = options => (req, res, next) => {
  if (req.url.match(/\.js$/)) {
    // return next()
  }
  let html = render_template(req.url)
    .then(state => {
      return render_template(req.url, renderOptions, state).then(htmlWithState => {
        res.setHeader('Cache-Control', 'public, max-age=60') // 1min for testing
        res.status(200).send(htmlWithState)
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
}
