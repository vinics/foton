import { render } from '../src/DOM.js'

// const title = createElement(
//   'h1',
//   {
//     id: 'idForce',
//     style: 'color: red;',
//   },
//   'Hello There',
// )
// const testElement = createElement(
//   'div',
//   {
//     style: 'background: lightgray;',
//   },
//   'some other text content',
//   title,
// )

// render(testElement, document.getElementById('root'))

render(
  <div>
    Some other text content!
    <h1>Hello There!</h1>
  </div>,
)

// =========================================================================

// ReactDOM.render(
//   <App />,
//   // Root element on HTML index file
//   document.getElementById('root')
// )
