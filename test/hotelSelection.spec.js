const chai = require("chai"),
    fs = require("fs"),
    expect = chai.expect,
    Page = require("../lib/hotelSelectionPage"),
    locators = require("../utils/locators");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);


const mochaTimeout = locators.mochaTimeout,
    baseUrl = locators.baseUrl,
    getTitle = locators.getTitle,
    submitButtonText = locators.submitButtonText,
    hotelSelectionUrl = locators.hotelSelectionUrl,
    hotelOffersButton = locators.hotelOffersButton,
    detailsPageUrl = locators.detailsPageUrl;

// ### 1. Launch the Application ("https://www.ab-in-den-urlaub.de")
// ### 2. By Default the option/ menu item selected is 'Pauschalreise'
// ### 3. Enter the name of city/Country as 'Mallorca' in the search box
// ### 4. Click on the 'Angebote suchen' button 
// ### 5. User is navigated to 'Hotelauswahl' page
// ### 6. Select the First Hotel in the list on the 'Hotelauswahl' page 
// ### 7. Click on the button 'Zu den Angeboten' of the selected hotel
// ### 8. User is navigated to 'Hotel Details Page'
// ### 9. Verify whether user is navigated to 'Hotel Details Page'

describe("Hotel Selection", async function () {
    this.timeout(mochaTimeout);
    let page, hotelDetailsPage, basePage, driver;

    before(async function () {
        page = new Page();
        driver = page.driver;
        await page.visit(baseUrl);
        await page.openApp();
    });

    it("Check the title of the page", async function () {
        const title = await page.getTitle();
        expect(title).to.include(getTitle);
    });

    it("Verify whether the cookie Button is enabled and click on it on home page", async function () {
        const isEnabled = await page.clickCookieButton();
        expect(isEnabled).to.be.true;
    });

    it("Enter Country as Mallorca in the Search box and check whether it is Enabled", async function () {
        const searchCountryBox = await page.selectCountry();
        await page.sendKeys();
        expect(searchCountryBox.state).to.be.true;
    });

    it("Verify submit button's text and it's state is enabled on the 'start page'", async function () {
        const result = await page.submitButton();
        expect(result.state).to.be.true;
        expect(result.buttonText).to.equal(submitButtonText);
    });

    it("Click on submit button and verify the url", async function () {
        const url = await page.clickSubmitButton();
        expect(url).to.include(hotelSelectionUrl)
    });

    it("Verify 'Zu den Angeboten' button is enabled to select the hotel on the 'Hotelauswahl page'", async function () {
        const result = await page.selectHotel();
        expect(result.state).to.be.true;
        expect(result.buttonText).to.equal(hotelOffersButton);
    });

    it("Click on the selected hotel and user is navigated to 'Hotel Details page'", async function () {
        let url = await page.clickHotel();
        expect(url).to.include(detailsPageUrl);
    });

    afterEach(async function () {
        let testCaseName = this.currentTest.title;
        let testCaseStatus = this.currentTest.state;
        if (testCaseStatus === "failed") {
            console.log(`Test: ${testCaseName}, Status: Failed!`);
            return await driver.takeScreenshot().then(data => {
                let screenshotPath = `Screenshots/${testCaseName}.png`;
                console.log(`Saving Screenshot as: ${screenshotPath}`);
                fs.writeFileSync(screenshotPath, data, "base64");
            });
        } else if (testCaseStatus === "passed") {
            console.log(`Test: ${testCaseName}, Status: Passed!`);
        } else {
            console.log(`Test: ${testCaseName}, Status: Unknown!`);
        }
    });

    after(async function () {
        await page.quit();
    });
});