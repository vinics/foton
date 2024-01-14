import { render, createTextElement, createElement } from './utils.js'

const textElement = createTextElement('Hello World!!')
const titleElement = createElement('h1', null, textElement)
// const titleElement = {
//   type: 'h1',
//   props: {
//     children: [textElement],
//   },
// }

const root = document.getElementById('root')

render(titleElement, root)
