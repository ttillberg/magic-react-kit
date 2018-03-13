import render_template from '../../../../lib/server_entry/render_react_app'

export const render = (req, options) => {
  return new Promise((success, fail) => {
    // first pass: gather the data
    // We don't care about the output at this stage but instead attach
    // a callback fired by the application when the async is done.
    render_template(req.url, options).then(state => {
      // Second pass: render the DOM
      // Pass the prefetched state as-is to hydrate the renderer.
      // We should now have a complete representation of the loaded app.
      const htmlWithState = render_template(req.url, options, state).then(html => {
        success(html)
      })
      // return the complete HTML
    })
  })
}
