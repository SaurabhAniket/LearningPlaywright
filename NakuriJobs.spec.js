const {test, expect} = require('@playwright/test')

test('Nakuri Jobs', async({page}) => {
    console.log("Top 5 jobs that gives in Search");
    await page.goto('https://www.naukri.com/')
    await expect(page).toHaveTitle(/Jobs - Recruitment - Job Search - Employment - Job Vacancies/)
    //await page.locator("xpath=//*[@id='root']/div[7]/div/div/div[1]/div/div/div/div[1]/div/input").fill('QA')
    //await page.locator("xpath=//*[@id='root']/div[7]/div/div/div[5]/div/div/div/div[1]/div/input").fill('Noida')
    //await page.locator("xpath=//*[@id='root']/div[7]/div/div/div[6]").click()
    await page.getByPlaceholder('Enter skills / designations / companies').fill('QA')
    await page.getByPlaceholder('Enter location').fill('Noida')
    await page.locator('.qsbSubmit').click();


    for (let i = 1; i <=5; i++){
        const jobXPath = `//*[@id="listContainer"]/div[2]/div/div[${i}]/div/div[1]/h2/a`;
        const companyXPath = `//*[@id="listContainer"]/div[2]/div/div[${i}]/div/div[2]/span/a[1]`;

        const jobTitle = await page.locator(`xpath=${jobXPath}`).innerText();
        const companyName = await page.locator(`xpath=${companyXPath}`).innerText();
        console.log(`${i}. ${jobTitle} at ${companyName}`);
    }



})