# [Automation Testing With Node.js, Javascript And Selenium webdriver (WebDriverJs)]

Design Page Objects and run Tests

## Run application
Clone the repository

```bash
git clone https://github.com/JayKishoreDuvvuri/WebDriverJs.git
```

Install dependencies
```bash
npm i chai chai-as-promised chromedriver mocha mochawesome selenium-webdriver --save-dev 

Install Node modules with command : npm i
```

Run test
```bash
mocha homePage.spec.js  #For only single individual test
npm test                #For Sequential Execution of tests
npm run test:parallel   #For Parallel Execution of tests
```

Folder Structure

    ├── ...
    │
    ├── lib                         # Helper methods
    │   ├── basePage.js             # Generic functionality for tests
    │   ├── startPage.js            # Start page/Home page testing functionality
    |   ├── hotelSelectionPage.js   # Hotel Selection page testing functionality
    |   └── hotelDetailsPage.js     # Hotel Details page testing functionality
    │
    ├── test                        # Test suite
    │   ├── homePage.spec.js        # Automated Test Script
    │   ├── hotelSelection.spec.js  # Automated Test Script
    |
    ├── utils                       # Utility files for testing           
    │   ├──locators.js              # HTML and CSS identifier for elements to test
    |
    ├── mochawesome-report           # Test Report for the tests executed
    |   ├──mochawesome.html         # Right click --> Reveal in Finder for MAC (OR) Reveal in Explorer for Windows
    |
    └── Screenshots                 # Screenshots captured for failed tests

  

