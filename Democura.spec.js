const {test , expect} = require('@playwright/test')

test('Cure demo' , async({page}) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/')
    await expect(page).toHaveTitle(/CURA Healthcare Service/)
    await page.click('id=btn-make-appointment')
    await expect(page).toHaveURL(/.*login/)
    //await page.getByPlaceholder('Username').fill('John Doe')
    //await page.getByPlaceholder('Password').fill('ThisIsNotAPassword')
    await page.locator("xpath=//*[@id='txt-username']").fill('John Doe')
    await page.locator("xpath=//*[@id='txt-password']").fill('ThisIsNotAPassword')
    await page.getByRole('button' , {name: 'Login'}).click()
    await expect(page).toHaveURL(/.*appointment/)
    await page.selectOption('#combo_facility', 'Seoul CURA Healthcare Center')
    await page.locator("xpath=//*[@id='chk_hospotal_readmission']").setChecked(true)
    const status = await page.locator("xpath=//*[@id='chk_hospotal_readmission']").isChecked()
    if(status){
        console.log('Checkbox is Checked')
    }else{
        console.log('Checkbox is not checked')
    }
    await page.locator("xpath=//*[@id='radio_program_medicaid']").setChecked(true)
    await page.getByPlaceholder('dd/mm/yyyy').fill('29/05/2026')
    await page.keyboard.press('Enter');
    await page.locator("xpath=//*[@id='txt_comment']").fill('i have seriious headache for last five days')
    await page.getByRole('button' , {name: 'Book Appointment'}).click()
    await expect(page).toHaveURL(/.*summary/)
    const confirmation = await page.locator("xpath=//*[@id='summary']/div/div/div[1]/h2").innerText()
    const facility = await page.locator("xpath=//*[@id='facility']").innerText()
    const applyhosread = await page.locator("xpath=//*[@id='hospital_readmission']").innerText()
    const HealthcareProgram = await page.locator("xpath=//*[@id='program']").innerText()
    const Visitdate  = await page.locator("xpath=//*[@id='visit_date']").innerText()
    const comment = await page.locator("xpath=//*[@id='comment']").innerText()

    console.log(`Confirmation: ${confirmation}, \nFacility: ${facility}, \nApply for hospital readmission: ${applyhosread}, \nVisitDate: ${Visitdate}, \nComment: ${comment}`)
})