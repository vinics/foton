export function render(element, container) {
  // Guard against function components
  if (typeof element.type === 'function') element = element()

  // Check and execute the proper create function
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type)

  const isProperty = (key) => key !== 'children'

  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name]
    })

  element.props.children?.forEach((child) => render(child, dom))

  container.appendChild(dom)
}
