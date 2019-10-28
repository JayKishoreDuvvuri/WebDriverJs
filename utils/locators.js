module.exports = {
  // Start Page Locators
  mochaTimeout: 50000,
  baseUrl: "https://www.ab-in-den-urlaub.de/",
  cookieButton: "CybotCookiebotDialogBodyButtonAccept",
  getTitle: "ab-in-den-urlaub.de",
  hotelCity: "div.form-selection.formSelection > label.item-hotel",
  searchCity: "base[searchTerm]",
  elementText: "Madrid",
  depDateValue: "25",
  retDateValue: "29",
  datePickerListStart: "div.datepicker-layer.start-input > div.datepicker-wrapper > div > div",
  datePickerListEnd: "div.datepicker-layer.end-input > div.datepicker-wrapper > div > div",
  datePickersecondTable: "div.datepicker-layer.end-input",
  startDate: "(//div[@class='datepicker-trigger'])[3]",
  endDate: "(//div[@class='datepicker-trigger'])[4]",
  submitButton: "(//input[@id='submit'])[2]",
  td: "td",
  fiveStarItem: "//span[@class='select-icon hc-icon-star-50']",
  reviewRating: "//span[@class='hc-icon-smiley-5 icon']",
  priceItem : "div.selectWrapper.show-for-xlarge > ul > li:nth-child(2)",
  priceClassDesc: "js-baseFrame-sortElement js-baseFrame-sort-icon active changeDirection desc",
  timeout: 5000,
  submitButtonText: "Angebote suchen",
  buttonText: "#hotel > div.form > div.form-footer > div.form-submit-button > div > span",
  submitBtnUrl: "https://hotels.ab-in-den-urlaub.de/de/EUR/hotels/Madrid/mr/2706480/arr/2019-11-25/dep/2019-11-29/adults/2/children/-1/-1/-1/rooms/1",


   // Hotel Selection Page Locators
   enterCountryBox : "//input[@id='idestflat' and @class='aiduac-0']",
   countryText : "Mallorca",
   searchSubmit : "#submit",
   hotelSelectionUrl : "https://www.ab-in-den-urlaub.de/iberl/hotels/depAirport/5000%2C5001%2C5002%2C5003/idestflat/Mallorca",
   selectHotel : "(//div[@class='callToAction'])[1]",
   hotelOffersButton : "Zu den Angeboten",


  // Hotel Details Page Locators
  hotelTitle : "//div[@class='_styling-h1 hotel-name']",
  datesAndPriceLink : "#tab-widget-item-price > a",
  hotelImage : "div.media-large > img",
  detailsPageUrl : "https://www.ab-in-den-urlaub.de/iberl/offers/adult/2/area/35/children/"
};
