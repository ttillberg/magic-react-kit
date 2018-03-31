const render_template = require('../../../lib/server_entry/render_react_app').default

const renderOptions = {
  scriptHref: '/client.js',
  stylesHref: null,
}

module.exports = options => (req, res, next) => {
  let html = render_template(req.url)
    .then(state => {
      return render_template(req.url, renderOptions, state).then(htmlWithState => {
        res.setHeader('Cache-Control', 'public, max-age=60') // 1min for testing
        res.status(200).send(htmlWithState)
      })
    })
    .catch(e => {
      // if the stack trace, use it and trim the long node_modules paths
      const output =
        (e.stack && e.stack.replace(/at.+(?=react-runtime|node_modules|webpack\:)/g, 'at ... ')) ||
        e

      res.status(500).send(
        `<html style="background: white;">
          <pre style="color:red; padding: 2em; font-size: 1.2em"><span style="font-size:5em">💣</span>
            \nserver side renderer
            \n--------------------\n\n
            \n${output}
            \n<!--${e.stack}-->
          </pre>
        </html>`
      )
      console.log(e.stack)
    })
}
