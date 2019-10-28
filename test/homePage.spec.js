const chai = require("chai"),
  fs = require("fs"),
  expect = chai.expect,
  Page = require("../lib/startPage");
locators = require("../utils/locators");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

let page, driver;
const mochaTimeout = locators.mochaTimeout,
  baseUrl = locators.baseUrl,
  getTitle = locators.getTitle,
  submitButtonText = locators.submitButtonText,
  submitBtnUrl = locators.submitBtnUrl,
  priceClassDesc = locators.priceValueDesc;

// ### 1. Launch the Application
// ### 2. Enter City name as "Madrid"
// ### 3. Select departure date as '25.11.2019' and return date as '29.11.2019'
// ### 4. Click on the Submit Button
// ### 5. User is navigated to Hotel selection Page in the city Madrid
// ### 6. Check the five star icon (Sterne) is displayed and click on it
// ### 7. Check the review rating (Bewertung) is displayed and click on it
// ### 8. Sort the results by price descending (Preis)

describe("Automated test for short trip scenario to Madrid for 2 Adults", async function () {
  this.timeout(mochaTimeout);

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
    let isEnabled = await page.clickCookieButton();
    expect(isEnabled).to.be.true;
  });

  it("Select the menu item Hotel(City) option", async function () {
    let isDisplayed = await page.clickHotelCity();
    expect(isDisplayed).to.equal(true);
  });

  it("Enter City as Madrid in the Search box and check whether it is Enabled", async function () {
    let searchCityBox = await page.selectCity();
    expect(searchCityBox.state).to.be.true;
  });

  it("Select the Departure and Return date for the Journey", async function () {
    let isDisplayed = await page.setDepartureDate();
    expect(isDisplayed).to.be.true;

    await page.setReturnDate();
    expect(isDisplayed).to.equal(true);
  });

  it("Verify submit button's text and it's state is enabled", async function () {
    const result = await page.submitButton();
    expect(result.state).to.be.true;
    expect(result.buttonText).to.equal(submitButtonText);
  });

  it("Click on submit button and verify the url", async function () {
    const url = await page.clickSubmitButton();
    expect(url).to.equal(submitBtnUrl)
  });

  it("Click on five star rating (sterne) icon", async function () {
    const isDisplayed = await page.selectFiveStars();
    expect(isDisplayed).to.be.true;
  });

  it("Click on best review rating (Bewertung) icon", async function () {
    const isDisplayed = await page.reviewRating();
    expect(isDisplayed).to.be.true;
  });

  it("Click on price tab to see the price in descending order", async function () {
    let isDisplayed = await page.price();
    expect(isDisplayed).to.be.true;

    isDisplayed = await page.priceValueDesc();
    expect(isDisplayed).to.be.true;
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
