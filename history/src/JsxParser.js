import fs from 'node:fs'

import nodeHtmlParser from 'node-html-parser'

const JSX_STRING = /\(\s*(<.*)>.*\)/gs
const JSX_INTERPOLATION = /\{([a-zA-Z0-9]+)\}/gs

export function getScriptTags(htmlFileString) {
  const SCRIPT_TAG_REGEX = /<script\b.*\bsrc="(?<source>.*)\.jsx"/g

  const result = []

  try {
    while (true) {
      const match = SCRIPT_TAG_REGEX.exec(htmlFileString)

      result.push({
        index: match.index,
        source: match.groups.source,
      })
    }
  } catch (error) {}

  return result
}

function getAttrs(attributesString) {
  if (attributesString.trim().length === 0) return {}

  const objAttributes = {}
  const parts = attributesString.split(' ')

  parts.forEach((part) => {
    const [name, value] = part.split('=')
    objAttributes[name] = value
  })

  return objAttributes
}

function parseText(textContent) {
  const interpolations = textContent.match(JSX_INTERPOLATION)

  if (!interpolations) {
    return `"${textContent.trim()}"`
  } else {
    // Replace placeholders
    textContent = replaceInterpolations(textContent)
    return `"${textContent.trim()}"`
  }
}

function replaceInterpolations(text, isOnJSON = false) {
  let interpolations = null

  while ((interpolations = JSX_INTERPOLATION.exec(text))) {
    if (isOnJSON) {
      text = text.replace(`"{${interpolations[1]}}"`, interpolations[1])
    } else {
      text = text.replace(
        `{${interpolations[1]}}`,
        `"+ ${interpolations[1]} +"`,
      )
    }
  }

  return text
}

function translate(root) {
  // Skip empty array
  if (Array.isArray(root) && root.length === 0) return

  let children = []

  // Translate children
  if (root.childNodes.length > 0) {
    children = root.childNodes
      .map((child) => translate(child))
      .filter((child) => child != null)
  }

  // TextNodes
  if (root.nodeType === 3) {
    if (root._rawText.trim() === '') return null

    return parseText(root._rawText)
  }

  const tagName = root.rawTagName
  const attributes = getAttrs(root.rawAttrs)

  // Return Library create element
  return `FotonDOM.createElement("${tagName}", ${replaceInterpolations(
    JSON.stringify(attributes),
    true,
  )}, ${children})`
}

export async function parseJsxFile(fileName) {
  const fileData = await fs.promises.readFile(fileName)
  let fileString = fileData.toString()

  const matches = JSX_STRING.exec(fileString)

  if (matches) {
    // TODO: Remove unnecessary adding of closing tag(>) by improving REGEX capture group
    // Add closing tag to HTML string
    const html = matches[1] + '>'

    // Parse HtmlString to a HtmlObjectStructure
    const root = nodeHtmlParser.parse(html)

    // Translate to a string replacing HtmlString to create element function
    const translated = translate(root.firstChild)

    // Replace parsed JSX to JS content
    fileString = fileString.replace(matches[1] + '>', translated)

    return fileString
  }
}
