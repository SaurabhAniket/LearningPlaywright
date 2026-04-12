const {test,expect} = require('@playwright/test')

test('Pagination Web tool' , async({page}) =>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    await expect(page).toHaveTitle(/Automation Testing Practice/)
    const rows = await page.locator("xpath=//*[@id='productTable']/tbody/tr")
    const countrows = await rows.count()
    console.log(`Rows Count: ${countrows}`)
    for(let i = 0;i< countrows;i++){
        const Rowsdata = await rows.nth(i).innerText()
        console.log(`Rows Data is: ${Rowsdata}`)
    }
    const targetElement = 'Wireless Mouse 20'
    const pagenummber = await page.locator('#pagination a')
    const pagecount = await pagenummber.count()
    console.log(`${pagecount}`)
    let found = false
    for( let p = 0 ; p < pagecount ; p++){
        const row = await rows.filter({hasText: targetElement})
        if( await row.count() > 0){
            console.log(`${targetElement} is present at ${p + 1} page`)
            await row.locator('td').nth(3).locator('input').check()
            found = true
            break
        }else{
            console.log(`${targetElement} not found at ${p + 1}`)
            if (p < pagecount - 1) {
            await pagenummber.nth(p + 1).click()
        }
    }
    }
})