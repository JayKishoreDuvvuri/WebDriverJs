const locators = require("../utils/locators");
let Page = require("./basePage");

const enterCountryBox = locators.enterCountryBox,
    timeout = locators.timeout,
    countryText = locators.countryText,
    cookieButton = locators.cookieButton,
    searchSubmit = locators.searchSubmit,
    submitButtonText = locators.submitButtonText,
    selectHotel = locators.selectHotel;

Page.prototype.openApp = async function () {
    await this.driver.manage().window().maximize();
    await this.driver.manage().deleteAllCookies();
};

Page.prototype.clickCookieButton = async function () {
    let cookieBtn = await this.findById(cookieButton);
    await this.click(cookieBtn);
    let isEnabled = await cookieBtn.isEnabled();

    return await this.driver.wait(async function () {
        return isEnabled;
    }, timeout);
};

Page.prototype.getTitle = async function () {
    const title = await this.driver.getTitle();
    return title;
};

Page.prototype.selectCountry = async function () {
    await this.clickCountryBox();
    let searchCountryBox = await this.findByXpath(enterCountryBox);
    await this.elementIsEnabled(searchCountryBox);

    const enabledState = await searchCountryBox.isEnabled();
    const searchBox = await this.driver.wait(async function () {
        return {

            state: enabledState
        }
    }, timeout);
    return searchBox;
};

Page.prototype.sendKeys = async function () {
    let searchCountryBox = await this.findByXpath(enterCountryBox);
    return await this.write(searchCountryBox, countryText);
}

Page.prototype.submitButton = async function () {
    let submitButton = await this.findByCss(searchSubmit);

    await this.elementIsVisible(submitButton);
    await this.elementIsEnabled(submitButton);

    const enabledState = await submitButton.isEnabled();
    const btnText = submitButtonText;

    const btnResult = await this.driver.wait(async function () {
        return {
            buttonText: btnText,
            state: enabledState
        }
    }, timeout);
    return btnResult;
};

Page.prototype.clickSubmitButton = async function () {
    let submitButton = await this.findByCss(searchSubmit);
    await this.click(submitButton);
    return await this.driver.getCurrentUrl();
}

Page.prototype.selectHotel = async function () {
    let hotelSelected = await this.findByXpath(selectHotel);
    await this.elementIsEnabled(hotelSelected);

    const enabledState = await hotelSelected.isEnabled();
    const btnText = await hotelSelected.getText();

    const btnResult = await this.driver.wait(async function () {
        return {
            buttonText: btnText,
            state: enabledState
        }
    }, timeout);
    return btnResult;
};

Page.prototype.clickHotel = async function (driver) {
    let hotelSelected = await this.findByXpath(selectHotel);
    await this.click(hotelSelected);

    const parentWindow = await this.driver.getWindowHandle();
    const allWindows = await this.driver.getAllWindowHandles();

    for (var currentWindow of allWindows) {
        if (!(currentWindow === parentWindow)) {
            await this.driver.switchTo().window(currentWindow);
            return await this.driver.getCurrentUrl();
        }
    }
};
module.exports = Page;
