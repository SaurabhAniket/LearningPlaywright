const {test,expect} = require('@playwright/test')
const { count } = require('node:console')

test('Alert Handler' , async({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    await expect(page).toHaveTitle(/Automation Testing Practice/)

    await page.locator("xpath=//*[@id='Wikipedia1_wikipedia-search-input']").fill('WWE')
    await page.locator("xpath=//*[@id='Wikipedia1_wikipedia-search-form']/div/span[2]/span[2]/input").click()
    const result = page.locator("#wikipedia-search-result-link a")
    await result.first().waitFor({ state: 'visible' });
    const countrows =  await result.count()
    console.log(`Count: ${countrows}`)
    const allresults = await page.locator("#wikipedia-search-result-link a").all()
    for(const links of allresults){
        const data = await links.innerText();
        console.log(`Data is: ${data}`)

        if(data == 'WWE SmackDown'){
            console.log(`Match Found`)
            await links.click()
            break;
        }
    }

    const target = await result.filter({hasText: 'Smackdown'}).innerText()
    console.log(`Count: ${target}`)



})