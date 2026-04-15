const {test,expect} = require('@playwright/test')
test('Changing the Tab' , async({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    await expect(page).toHaveTitle(/Automation Testing Practice/)

    await page.locator("xpath=//*[@id='Wikipedia1_wikipedia-search-input']").fill('WWE')
    await page.locator("xpath=//*[@id='Wikipedia1_wikipedia-search-form']/div/span[2]/span[2]/input").click()
    const search = await page.locator("#wikipedia-search-result-link > a")
    await search.first().waitFor({state: 'visible'})
    const countsearch =  await search.count()
    console.log(`${countsearch}`)

    const alldata = await page.locator("#wikipedia-search-result-link > a").all()
    for(const links of alldata){
        const data = await links.innerText()
        console.log(`Search Results are: ${data}`)


        if(/smackdown/i.test(data)){
            console.log(`Data Found`)
            const pagepromise = page.context().waitForEvent('page')
            await links.click()
            const newTab = await pagepromise
            await newTab.waitForLoadState();
            console.log(`New Tab Title: ${await newTab.title()}`);
            await newTab.close();
            break;
        }else{
            console.log(`Data Not Found`)
        }
    }


})


test('New Tab' , async({page}) =>{
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html')
    await expect(page).toHaveTitle(/Automation Testing Practice/)

    const pagePromise = page.context().waitForEvent('page')
    await page.locator("xpath=//*[@id='HTML4']/div[1]/button").click()
    const newtab = await pagePromise
    await newtab.waitForLoadState();
    const title = await newtab.title()
    console.log(`Title of the New Page is: ${title}`)
    await newtab.close()

    
})

test('New popup' , async({page}) =>{
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html')
    await expect(page).toHaveTitle(/Automation Testing Practice/)

    const pagePromise = page.waitForEvent('popup')
    await page.locator("xpath=//*[@id='PopUp']").click()
    const newtab = await pagePromise
    await newtab.waitForLoadState();
    const title = await newtab.title()
    console.log(`Title of the New Page is: ${title}`)
    await newtab.close()
    
})