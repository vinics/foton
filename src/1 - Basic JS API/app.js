import { render } from './1 - Basic JS API/utils.js'

const textElement = {
  type: 'TEXT_ELEMENT',
  props: {
    nodeValue: 'Hello World!',
  },
}

const root = document.getElementById('root')

render(textElement, root)
