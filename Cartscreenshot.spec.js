const {test,expect} = require('@playwright/test');
const readline = require('readline');

test('CastScreenshot' , async({page}) => {
    
    await page.goto('https://www.saucedemo.com/')
    await expect(page).toHaveTitle(/Swag Labs/)
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.locator("xpath=//*[@id='login-button']").click()
    //let product = prompt("What Product you are looking for ?");
    console.log('Adding Sauce Labs Backpack');
    //await page.getByRole('button' , { name: 'Add to cart'}).click()
    await page.locator("xpath=//*[@id='add-to-cart-sauce-labs-backpack']").click()
    await page.screenshot({ path: 'addtocart.png'})
    console.log("Product Screenshot Is saved")
    await page.locator('.shopping_cart_link').click()
    await page.screenshot({ path: 'checkboxss.png'})
    console.log("Product Screenshot Is saved")
    await page.locator("xpath=//*[@id='checkout']").click()
    console.log('Enter the Contact Details')
    await page.locator("xpath=//*[@id='first-name']").fill('Saurabh')
    await page.locator("xpath=//*[@id='last-name']").fill('Aniket')
    await page.locator("xpath=//*[@id='postal-code']").fill('123345')
    await page.screenshot({ path: 'contactdetails.png'})
    console.log("Product Screenshot Is saved")
    await page.locator("xpath=//*[@id='continue']").click();
    console.log("Get the final detail")
    const productname = await page.locator("xpath=//*[@id='item_4_title_link']/div").innerText()
    const price = await page.locator(`.inventory_item_price`).innerText()
    const Tax = await page.locator(`.summary_tax_label`).innerText()
    const Total = await page.locator(`.summary_total_label`).innerText()

    console.log(`Product: ${productname}, Price: ${price}, Tax: ${Tax}, Total: ${Total}`)
    await page.screenshot({path: 'summary.png'})
    await page.locator("xpath=//*[@id='finish']").click()
    const confirmation = await page.locator("xpath=//*[@id='checkout_complete_container']/h2").innerText()
    console.log(`Message: ${confirmation}`)
    await page.screenshot({path: 'confirmation.png'})
    await page.close()
    
})
