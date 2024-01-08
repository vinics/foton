import fs from 'node:fs'

const JSX_STRING = /\(\s*(<.*)>\s*\)/g

export function getScriptTags(htmlFileString) {
  const SCRIPT_TAG_REGEX = /<script[\s\w\W\S]*\ssrc="(.*)"/gs

  const result = SCRIPT_TAG_REGEX.exec(htmlFileString)

  return result
}

export async function parseJsxFile(fileName) {
  const fileData = await fs.promises.readFile(fileName)
  const fileString = fileData.toString()

  console.log(getScriptTags(fileString))
}
