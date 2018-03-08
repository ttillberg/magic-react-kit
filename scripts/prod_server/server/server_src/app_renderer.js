import render_template from '../../../common/server_entry/render_react_app'

const defaultOptions = { client: '/client.js' }

export const render = (url, options = defaultOptions) => {
  return new Promise((success, fail) => {
    // first pass: gather the data
    // We don't care about the output at this stage but instead attach
    // a callback fired by the application when the async is done.
    let html = render_template(url, options.client, state => {
      // Second pass: render the DOM
      // Pass the prefetched state as-is to hydrate the renderer.
      // We should now have a complete representation of the loaded app.
      const htmlWithState = render_template(url, options.client, false, state)
      // return the complete HTML
      success(htmlWithState)
    })
  })
}
