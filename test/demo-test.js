const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

const files = fs.readdirSync('./dist/demo')
const htmlFiles = files.filter(file => file.match(/.*\.html/))

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  for (const htmlFile of htmlFiles) {
    console.log(htmlFile)
    const htmlFilePath = path.join(__dirname, '../dist/demo', htmlFile)
    console.log(htmlFilePath)
    await page.goto(`file://${htmlFilePath}`, ({ timeout: 300000 }))
  }
  await browser.close()
})()
