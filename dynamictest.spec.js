const {test,expect} = require('@playwright/test')

test('Dynamic Test' , async({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    await expect(page).toHaveTitle(/Automation Testing Practice/)
    const heading = await page.locator("xpath=//*[@id='HTML12']/h2").innerText()
    console.log(`${heading}`)
    const TableRow = await page.locator("xpath=//*[@id='rows']//tr")
    const CountRow = await TableRow.count();
    console.log(`Row count is: ${CountRow}`)
    for (let i = 0 ; i<CountRow;i++){
        const rows = await TableRow.nth(i).innerText()
        console.log(`Rows Data: ${rows}`)
    }
    const name = await TableRow.filter({hasText: 'Internet Explorer'})

    const cpu = await name.locator('td').nth(1).innerText()
    const disk = await name.locator('td').nth(2).innerText()
    const network = await name.locator('td').nth(3).innerText()
    const memory = await name.locator('td').nth(4).innerText()

    console.log(`CPU: ${cpu}, \nDISK: ${disk}, \nNetwork: ${network}, \nMemory: ${memory}`)

    await page.close()

})