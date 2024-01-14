import fs from 'node:fs'
import path from 'node:path'

import { getScriptTags, parseJsxFile } from './JsxParser.js'

const INDEX_HTML = path.resolve('.\\test\\index.html')

// 1. Read Index HTML File
const htmlIndexFileContent = await fs.promises.readFile(INDEX_HTML)
const scriptTagsSource = getScriptTags(htmlIndexFileContent.toString())

// console.log('ScriptTagSource: ', scriptTagsSource)
// console.log('>>: ', htmlIndexFileContent.toString().slice(221, -1))

// 2. Get imported JSX file string
const WORKING_FOLDER = path.dirname(INDEX_HTML)

scriptTagsSource.forEach((jsxScriptTag) => {
  const targetFilePath = path.resolve(
    WORKING_FOLDER,
    `${path.basename(jsxScriptTag.source)}.jsx`,
  )

  // 3. Translate JSX
  const parsedJsFile = parseJsxFile(targetFilePath)

  parsedJsFile.then(async (parsedFileData) => {
    const fileParsedPath = path.join(process.cwd(), `${jsxScriptTag.source}.js`)
    await fs.promises.writeFile(fileParsedPath, parsedFileData)

    // 4. Replace script taf file source
    const indexFileReference = htmlIndexFileContent
      .toString()
      .slice(jsxScriptTag.index, -1)

    indexFileReference.replace(`${jsxScriptTag.source}.jsx`, fileParsedPath)

    console.log('search value: ', `${jsxScriptTag.source}.jsx`)
    console.log('replace value: ', fileParsedPath)
    console.log(indexFileReference)

    // const target = null
    //     // const TARGET_SCRIPT_TAG_PATTERN =
    //     //   '\\b<script\b.*\bsrc="' + jsxFilePath + '.jsx"\\b'
    //     const TARGET_SCRIPT_TAG_PATTERN = `script`
    //     const TARGET_REGEX = new RegExp(TARGET_SCRIPT_TAG_PATTERN, 'gm')
    //     console.log(TARGET_REGEX)
    //     console.log(TARGET_REGEX.exec(htmlIndexFileContent.toString()))
    //     // while ((target = TARGET_REGEX.exec(htmlIndexFileContent.toString()))) {
    //     //   console.log(target)
    //     // }
  })
})
