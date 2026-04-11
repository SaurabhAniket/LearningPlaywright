const { test, expect } = require('@playwright/test');

test.use({ 
    video: 'on',
    viewport: { width: 1280, height: 720 } 
    });

test('Cartscreenshot' , async({page}) => {
    await page.goto('https://www.saucedemo.com/')
    await expect(page).toHaveTitle(/Swag Labs/)
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    //await page.locator('.submit-button btn_action').click()
    await page.click('id=login-button')
    console.log("Adding the Product to the Cart")
    await page.screenshot({path: 'carrt.png'})
    await page.locator("xpath=//*[@id='add-to-cart-sauce-labs-bike-light']").click()
    await page.locator('.shopping_cart_link').click()
    await page.screenshot({path: 'cart2.png'})
    const productname = await page.locator('.inventory_item_name').innerText()
    const price = await page.locator('.inventory_item_price').innerText()
    console.log(`Product: ${productname}, Price: ${price}`)
    await page.click('id=checkout')
    console.log('Enter the Your Information')
    await page.getByPlaceholder('First Name').fill('Saurabh')
    await page.getByPlaceholder('Last Name').fill('Aniket')
    await page.getByPlaceholder('Zip/Postal Code').fill('800025')
    await page.click('id=continue')
    const orderId =  await page.locator("xpath=//*[@id='checkout_summary_container']/div/div[2]/div[2]").innerText()
    const ShippingInfo = await page.locator("xpath=//*[@id='checkout_summary_container']/div/div[2]/div[4]").innerText()
    const totalPrice = await page.locator("xpath=//*[@id='checkout_summary_container']/div/div[2]/div[8]").innerText()
    console.log(`OrderId: ${orderId}, \nShippingDetail: ${ShippingInfo}, \nFullPrice: ${totalPrice}`)
    await page.getByRole('button' , { name : 'Finish'}).click()
    const confirmation =  await page.locator("xpath=//*[@id='checkout_complete_container']/h2").innerText()
    console.log(`Message: ${confirmation}`)
    const video = page.video();
    await page.close()
    if (video) {
        await video.saveAs('recordings/checkout-test.webm');
        console.log("Video manually saved to: recordings/checkout-test.webm");
    }


})