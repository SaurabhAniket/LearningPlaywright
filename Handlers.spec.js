const {test,expect} = require('@playwright/test')

test('Alert Handler' , async({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    await expect(page).toHaveTitle(/Automation Testing Practice/)

    page.on('dialog' , async dialog => {
        console.log(`Alert Message is: ${dialog.message()}`)
        await dialog.accept()
    })
    await page.locator("xpath=//*[@id='alertBtn']").click()
})

test('Alert Handler 2' , async({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    await expect(page).toHaveTitle(/Automation Testing Practice/)

    page.on('dialog', async dialog =>{
        console.log(`Message is: ${dialog.message()}`)
        await dialog.accept()
    })
    await page.locator("xpath=//*[@id='confirmBtn']").click()
    const response = await page.locator("xpath=//*[@id='demo']").innerText()
    console.log(`Response: ${response}`)
})

test('Alert Handler 3' , async({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    await expect(page).toHaveTitle(/Automation Testing Practice/)

    page.on('dialog', async dialog =>{
        console.log(`Message is: ${dialog.message()}`)
        await dialog.dismiss()
    })
    await page.locator("xpath=//*[@id='confirmBtn']").click()
    const response = await page.locator("xpath=//*[@id='demo']").innerText()
    console.log(`Response: ${response}`)
})


test('Alert Handler 4' , async({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    await expect(page).toHaveTitle(/Automation Testing Practice/)

    page.on('dialog' , async dialog => {
        console.log(`Message is: ${dialog.message()}`)
        await dialog.accept('Saurabh Aniket')
    })

    await page.locator("xpath=//*[@id='promptBtn']").click()
    const message = await page.locator("xpath=//*[@id='demo']").innerText()
    console.log(`Message: ${message}`)
})

test('Alert Handler 5' , async({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    await expect(page).toHaveTitle(/Automation Testing Practice/)

    page.on('dialog' , async dialog => {
        console.log(`Message is: ${dialog.message()}`)
        await dialog.dismiss()
    })

    await page.locator("xpath=//*[@id='promptBtn']").click()
    const message = await page.locator("xpath=//*[@id='demo']").innerText()
    console.log(`Message: ${message}`)
})

test('Alert Handler 6' , async({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    await expect(page).toHaveTitle(/Automation Testing Practice/)

    page.on('dialog' , async dialog => {
        console.log(`Type is: ${dialog.type()}`)
        if(dialog.type() == 'prompt'){
            await dialog.accept('Saurabh Aniket')
        }else{
            await dialog.dismiss()
        }
    })

    await page.locator("xpath=//*[@id='promptBtn']").click()
    //await page.locator("xpath=//*[@id='confirmBtn']").click()
    const message = await page.locator("xpath=//*[@id='demo']").innerText()
    console.log(`Message: ${message}`)
})