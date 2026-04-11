const {test , expect} = require('@playwright/test')

test('AutomationTesting', async({page}) => {
   await page.goto('https://testautomationpractice.blogspot.com/')
   await expect(page).toHaveTitle(/Automation Testing Practice/)
   await page.getByPlaceholder('Enter Name').fill('Saurabh Aniket')
   await page.getByPlaceholder('Enter EMail').fill('saurabhaniket2903@gmail.com')
   await page.getByPlaceholder('Enter Phone').fill('7488597322')
   await page.locator("xpath=//*[@id='textarea']").fill('Patna')
   await page.locator("xpath=//*[@id='male']").setChecked(true)
   await page.locator("xpath=//*[@id='wednesday']").setChecked(true)
   await page.selectOption('#country', 'India')
   await page.selectOption('#colors', ['Red','Blue']) 
   const listall = await page.locator("xpath=//*[@id='animals']").allTextContents();
   console.log(`list: ${listall}`)
   const sortedList = [...listall].sort()
   if(JSON.stringify(listall) == JSON.stringify(sortedList)){
      console.log("List is Sorted")
   }else{
      console.log("List is not Sorrted")
   }
   await page.locator("xpath=//*[@id='datepicker']").fill('15/04/2023')
   await page.keyboard.press('Enter');
   await page.locator("xpath=//*[@id='txtDate']").click()
   await page.locator("#ui-datepicker-div").getByRole('link', { name: '25', exact: true }).click();
   await page.keyboard.press('Enter')
   await page.locator("xpath=//*[@id='singleFileInput']").setInputFiles('carrt.png')
   await page.locator("xpath=//*[@id='singleFileForm']/button").click()
   await page.locator("xpath=//*[@id='multipleFilesInput']").setInputFiles([
      'carrt.png',
      'cart2.png',
      'Naukri_Jobs.csv'
   ])
   await page.locator("xpath=//*[@id='multipleFilesForm']/button").click()
   await page.close()

   
    
})