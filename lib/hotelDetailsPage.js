const locators = require("../utils/locators");
let Page = require("./basePage");


function HotelDetailsPage(driver) {
    Page.call(this, driver);
}

HotelDetailsPage.prototype = Object.create(Page.prototype);
HotelDetailsPage.prototype.constructor = HotelDetailsPage;

const hotelTitle = locators.hotelTitle,
    selectHotel = locators.selectHotel,
    timeout = locators.timeout,
    datesAndPriceLink = locators.datesAndPriceLink,
    hotelImage = locators.hotelImage;

Page.prototype.selectHotel = async function () {
    let hotelSelected = await this.findByXpath(selectHotel);
    return await this.click(hotelSelected);
};

Page.prototype.getWindowHandles = async function (driver) {
    const parentWindow = await driver.getWindowHandle();
    const allWindows = await driver.getAllWindowHandles();
    if (parentWindow === allWindows) {
        return;
    } else {
        allWindows.forEach(async function (currentWindow) {
            if (!(currentWindow === parentWindow)) {
                await driver.switchTo().window(currentWindow);
                const currentWindowTitle = await driver.getTitle();
                const currentWindowUrl = await driver.getCurrentUrl();
                await driver.close();
                await driver.switchTo().window(parentWindow);
            }
        });
    }
};

HotelDetailsPage.prototype.getPageUrl = async function () {
    const detailsPageUrl = await this.driver.getCurrentUrl();
    return detailsPageUrl;
};

HotelDetailsPage.prototype.hotelName = async function () {
    let hotelName = await this.findByXpath(hotelTitle);
    await this.elementIsVisible(hotelName);
    let isVisible = await hotelName.isDisplayed()
    return await this.driver.wait(async function () {
        return isVisible;
    }, timeout);
};

HotelDetailsPage.prototype.dateAndPrice = async function () {
    let datePriceLink = await this.findByCss(datesAndPriceLink);
    await this.elementIsEnabled(datePriceLink);
    const enabledState = await searchCountryBox.isEnabled();
    const result = await this.driver.wait(async function () {
        return {

            state: enabledState
        }
    }, timeout);
    return result;
};

HotelDetailsPage.prototype.hotelPicture = async function () {
    let hotelsPicture = await this.findByCss(hotelImage);
    await this.elementIsVisible(hotelsPicture);
    let isVisible = await hotelsPicture.isDisplayed();

    return await this.driver.wait(async function () {
        return isVisible;
    }, timeout);
};
module.exports = HotelDetailsPage;
