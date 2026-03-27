const {test,expect} = require('@playwright/test')

test('Login Application', async({page}) => {
    await page.goto('https://www.amazon.in/')
    await expect(page).toHaveTitle('Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in');
    await page.locator("xpath=//*[@id='nav-link-accountList-nav-line-1']").click();
    await page.locator("xpath=//*[@id='ap_email_login']").fill("saurabhaniket2903@gmail.com");
    await page.locator("xpath=//*[@id='continue']/span/input").click();
    await page.locator("xpath=//*[@id='ap_password']").fill("Saurabh@98765");
    await page.locator("xpath=//*[@id='signInSubmit']").click();
    await expect(page.locator("xpath=//*[@id='nav-link-accountList-nav-line-1']")).toHaveText("Hello, saurabh");
    console.log("Login successful");
    await page.locator("xpath=//*[@id='twotabsearchtextbox']").fill("iphone 17 pro 256gb");
    await page.locator("xpath=//*[@id='nav-search-submit-button']").click();
    const price =  await page.locator("xpath=(//span[@class='a-price-whole'])[1]").innerText();
    console.log("Price of the Product is: " + price);
    await page.close();
})

test('Flipkart Broswer', async({page}) => {
    await page.goto('https://www.flipkart.com/');
    await expect(page).toHaveTitle(/Online Shopping/);
    await page.locator("xpath=/html/body/div[5]/div/span").click();
    await page.locator("xpath=//*[@id='container']/div/div[1]/div/div/div/div/div/div/div/div/div/div[1]/div/div/div[2]/div/div/div/div/div/header/div[1]/div[1]/form/div/div/input").fill("iphone 17 pro 256gb");
    await page.locator("xpath=//*[@id='container']/div/div[1]/div/div/div/div/div/div/div/div/div/div[1]/div/div/div[2]/div/div/div/div/div/header/div[1]/div[1]/form/div/button").click();
    console.log("First Lets Check the Rating of the Product");
    const RatingText = await page.locator("xpath=//*[@id='productRating_LSTMOBHFN6YV7GYZHSMOB0WBP_MOBHFN6YV7GYZHSM_']/div").innerText();
    const Rating = parseFloat(RatingText);
    if(Rating >= 4.5){
        console.log("Lets Check the Price");
        await page.locator("xpath=//*[@id='container']/div/div[3]/div[1]/div[2]/div[2]/div/div/div/a/div[2]/div[2]/div[1]/div/div");
    }else{
        console.log("Rating is lower:" ({Rating})`);
        page.close();
    }


})
