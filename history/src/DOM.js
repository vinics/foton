export function createElement(tag, options, ...children) {
  // 1. Create HTMLElement
  const rootElement = document.createElement(tag)

  // 2. Assign attributes
  Object.assign(rootElement, options)

  // 3. Iterate over children
  children.forEach((child) => {
    if (typeof child === 'string') {
      rootElement.appendChild(document.createTextNode(child))
    } else {
      rootElement.appendChild(child)
    }
  })

  return rootElement
}

export function render(JsxContent, rootElement) {
  rootElement.appendChild(JsxContent)
}
