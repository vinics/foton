import fs from 'node:fs'

import { getScriptTags } from './JsxParser.js'

const INDEX_HTML = 'test\\index.html'

// 1. Read Index HTML File
const htmlIndexFileContent = await fs.promises.readFile(INDEX_HTML)

const scriptTags = getScriptTags(htmlIndexFileContent.toString())

console.log('0: ', scriptTags[0])
console.log('1: ', scriptTags[1])
console.log('2: ', scriptTags[2])

// 2. Get imported JSX
