const {test ,expect} = require('@playwright/test')
const fs = require('fs')


test('Saving Top 5 jobs on CSV' ,async({page}) => {
    await page.goto('https://www.naukri.com/')
    await expect(page).toHaveTitle(/Jobs - Recruitment - Job Search - Employment - Job Vacancies/)
    //await expect(page).toHaveTitle(/Recommended Jobs | Mynaukri/)
    await page.getByPlaceholder('Enter skills / designations / companies').fill('QA')
    await page.getByPlaceholder('Enter location').fill('Noida')
    await page.locator('.qsbSubmit').click()

    console.log("Top 5 Jobs are");
    const Datacsv = []
    Datacsv.push('Rank,Job,Company')

    for( let i = 1; i<=5 ; i++){
        const XpathJobs = `//*[@id="listContainer"]/div[2]/div/div[${i}]/div/div[1]/h2/a`;
        const XpathJobs2 =  `//*[@id="listContainer"]/div[2]/div/div[${i}]/div/div[2]/span/a[1]`;

        const RealXpath = await page.locator(`xpath=${XpathJobs}`).innerText();
        const Realxpath2 = await page.locator(`xpath=${XpathJobs2}`).innerText();

        console.log(`${i}. ${RealXpath} at ${Realxpath2}`);
        Datacsv.push(`${i},${RealXpath},${Realxpath2}`)
    }

    const csvContent = Datacsv.join('\n');
    fs.writeFileSync('Naukri_Jobs.csv', csvContent)
    console.log("Files Saved")

})