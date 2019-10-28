const locators = require("../utils/locators");
let Page = require("./basePage");
const { By } = require('selenium-webdriver');

const cookieButton = locators.cookieButton,
  hotelCity = locators.hotelCity,
  searchCity = locators.searchCity,
  elementText = locators.elementText,
  startDate = locators.startDate,
  buttonText = locators.buttonText,
  td = locators.td,
  fiveStarItem = locators.fiveStarItem,
  reviewRating = locators.reviewRating,
  priceItem = locators.priceItem,
  timeout = locators.timeout,
  depDateValue = locators.depDateValue,
  retDateValue = locators.retDateValue,
  datePickerListStart = locators.datePickerListStart,
  datePickersecondTable = locators.datePickersecondTable,
  datePickerListEnd = locators.datePickerListEnd,
  priceClassDesc = locators.priceClassDesc,
  submitButton = locators.submitButton;

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

Page.prototype.clickHotelCity = async function () {
  const clickHotel = await this.findByCss(hotelCity);
  await this.click(clickHotel);
  let isDisplayed = await clickHotel.isDisplayed();

  return await this.driver.wait(async function () {
    return isDisplayed;
  }, timeout);
};

Page.prototype.selectCity = async function () {
  let searchCityBox = await this.findById(searchCity);
  await this.elementIsVisible(searchCityBox);
  await this.elementIsEnabled(searchCityBox);

  const enabledState = await searchCityBox.isEnabled();
  const fieldText = elementText;

  await this.write(searchCityBox, elementText);

  const searchBox = await this.driver.wait(async function () {
    return {
      text: fieldText,
      state: enabledState
    }
  }, timeout);
  return searchBox;
};

Page.prototype.setDepartureDate = async function () {
  return await this.fromDatePicker();
};

Page.prototype.setReturnDate = async function () {
  return await this.toDatePicker();
};

Page.prototype.submitButton = async function () {
  let submitButtonElement = await this.findByXpath(submitButton);

  await this.elementIsEnabled(submitButtonElement);
  submitbtnText = await this.findByCss(buttonText);

  const enabledState = await submitButtonElement.isEnabled();
  const btnText = await submitbtnText.getText();

  const btnResult = await this.driver.wait(async function () {
    return {
      buttonText: btnText,
      state: enabledState
    }
  }, timeout);
  return btnResult;
};

Page.prototype.clickSubmitButton = async function () {
  let submitButtonElement = await this.findByXpath(submitButton);
  await this.click(submitButtonElement);
  return await this.driver.getCurrentUrl();
}

Page.prototype.fromDatePicker = async function () {
  //Click and open the datepickers and this is for 'Departure/Start' date picker table
  let dateWidgetFrom = await this.findByXpath(startDate);
  await this.click(dateWidgetFrom);
  let dateWidget = await this.findByCss(datePickerListStart);

  let isDisplayed = await dateWidget.isDisplayed();

  //This are the columns of the from date picker table
  let columns = await dateWidget.findElements(By.tagName(td));

  //DatePicker is a table. Thus we can navigate to each cell
  //and if a cell matches with the current date then we will click it.
  for (let cell of columns) {
    const text = await cell.getText();
    if (text === depDateValue) {
      cell.click();
      break;
    }
  }
  return isDisplayed;
};

Page.prototype.toDatePicker = async function () {
  //Click and open the datepickers and this is for 'Return' date picker table
  let datesecondTable = await this.findByCss(datePickersecondTable);
  await this.elementIsVisible(datesecondTable);

  let dateWidget = await this.findByCss(datePickerListEnd);

  let isDisplayed = await dateWidget.isDisplayed();

  //This are the columns of the from date picker table
  let columns = await dateWidget.findElements(By.tagName(td));

  //DatePicker is a table. Thus we can navigate to each cell
  //and if a cell matches with the current date then we will click it.
  for (let cell of columns) {
    const text = await cell.getText();
    if (text === retDateValue) {
      cell.click();
      break;
    }
  }
  return isDisplayed;
};

Page.prototype.selectFiveStars = async function () {
  let fiveStarIcon = await this.findByXpath(fiveStarItem);
  await this.click(fiveStarIcon);
  return fiveStarIcon.isDisplayed();
}

Page.prototype.reviewRating = async function () {
  let reviewRatingIcon = await this.findByXpath(reviewRating);
  await this.click(reviewRatingIcon);
  return reviewRatingIcon.isDisplayed();
}

Page.prototype.price = async function () {
  let priceTab = await this.findByCss(priceItem);
  await this.click(priceTab);
  return priceTab.isDisplayed();
}

Page.prototype.priceValueDesc = async function () {
  let priceTab = await this.findByCss(priceItem);
  await this.elementIsVisible(priceTab);
  await this.click(priceTab); 

  let priceClass = await this.findByclassName(priceClassDesc)
  return priceClass.isDisplayed();
}
module.exports = Page;
