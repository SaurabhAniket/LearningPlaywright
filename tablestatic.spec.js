const {test,expect} = require('playwright/test')

test('Static Test' , async({page}) =>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    await expect(page).toHaveTitle(/Automation Testing Practice/)
    const rows = await page.locator("xpath=//*[@id='HTML1']/div[1]/table//tr")
    const Rowscount = await rows.count();
    console.log(`Row Count in the Table: ${Rowscount}`)
    for(let i = 0 ; i< Rowscount ; i++){
        const rowdata = await rows.nth(i).innerText();
        console.log(`RowsData: ${rowdata.trim().split(/\s+/).join(' / ')}`)
    }
    const book = await rows.filter({hasText : 'Master In Java'})
    const bookname = await book.locator('td').nth(0).innerText();
    const author = await book.locator('td').nth(1).innerText();
    const langaugae = await book.locator('td').nth(2).innerText();
    const price = await book.locator('td').nth(3).innerText();
    console.log(`BookName: ${bookname} \nAuthor: ${author} \nLangaugae: ${langaugae} \nPrice: ${price}`)
})