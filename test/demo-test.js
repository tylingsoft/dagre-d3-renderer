const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

const files = fs.readdirSync('./dist/demo')
const htmlFiles = files.filter(file => file.match(/.*\.html/))

let remaining = htmlFiles.length
let errorCount = 0
;(async () => {
  const browser = await puppeteer.launch()
  await Promise.all(htmlFiles.map(async htmlFile => {
    const page = await browser.newPage()
    page.once('error', error => {
      console.log('error: ', error)
      errorCount += 1
    })
    page.once('pageerror', pageerror => {
      console.log('pageerror: ', pageerror)
      errorCount += 1
    })
    const htmlFilePath = path.join(__dirname, '../dist/demo', htmlFile)
    await page.goto(`file://${htmlFilePath}`, ({ timeout: 300000 }))
    console.log(`Done testing ${htmlFile}, ${--remaining} remainting`)
  }))
  await browser.close()
  if (errorCount > 0) {
    console.error(`${errorCount} error(s) detected`)
    process.exit(1)
  }
})()
