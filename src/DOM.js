// function getAttributeString(attributeObject) {
//   const attributeKeys = Object.keys(attributeObject)

//   const attributeArray = attributeKeys.map((attrName) => {
//     return `${attrName === 'className' ? 'class' : attrName}="${
//       attributeObject[attrName]
//     }"`
//   })

//   return attributeArray.join(' ')
// }

/**
 *
 * @param {string} tag
 * @param {object} options
 * @param  {...any} children
 * @returns
 */
// export function createElement(tag, options, ...children) {
//   return `<${tag} ${getAttributeString(options)}>${children.map(
//     (child) => child,
//   )}</${tag}>`
// }
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
