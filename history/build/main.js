import * as FotonDOM from '../src/DOM.js'

FotonDOM.render(
  FotonDOM.createElement("div", {}, "Some other text content!",FotonDOM.createElement("h1", {}, "Hello There!")),
)
