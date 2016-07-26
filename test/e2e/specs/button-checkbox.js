module.exports = {
  'Click on 2, 3 buttons' : function (browser) {
    browser
      .url('http://localhost:8080/#!/button')
      .pause(1000);

    // expect element  to be present in 1000ms
    browser.expect.element('body').to.be.present.before(1000);

    // click on 2,3, elements
    browser.click(".uk-button-group[data-uk-button-checkbox] button:nth-child(2)");
    browser.click(".uk-button-group[data-uk-button-checkbox] button:nth-child(3)");

    // check active classes
    browser.assert.cssClassNotPresent(".uk-button-group[data-uk-button-checkbox] button:nth-child(1)", 'uk-active');
    browser.assert.cssClassPresent(".uk-button-group[data-uk-button-checkbox] button:nth-child(2)", 'uk-active');
    browser.assert.cssClassPresent(".uk-button-group[data-uk-button-checkbox] button:nth-child(3)", 'uk-active');
    // check attributes
    browser.assert.attributeContains('.uk-button-group[data-uk-button-checkbox] button:nth-child(1)', 'aria-checked', 'false');
    browser.assert.attributeContains('.uk-button-group[data-uk-button-checkbox] button:nth-child(2)', 'aria-checked', 'true');
    browser.assert.attributeContains('.uk-button-group[data-uk-button-checkbox] button:nth-child(3)', 'aria-checked', 'true');

    // toggle click on 2 button
    browser.click(".uk-button-group[data-uk-button-checkbox] button:nth-child(2)");
    browser.assert.cssClassNotPresent(".uk-button-group[data-uk-button-checkbox] button:nth-child(1)", 'uk-active');
    browser.assert.cssClassNotPresent(".uk-button-group[data-uk-button-checkbox] button:nth-child(2)", 'uk-active');
    browser.assert.cssClassPresent(".uk-button-group[data-uk-button-checkbox] button:nth-child(3)", 'uk-active');
    // check attributes
    browser.assert.attributeContains('.uk-button-group[data-uk-button-checkbox] button:nth-child(1)', 'aria-checked', 'false');
    browser.assert.attributeContains('.uk-button-group[data-uk-button-checkbox] button:nth-child(2)', 'aria-checked', 'false');
    browser.assert.attributeContains('.uk-button-group[data-uk-button-checkbox] button:nth-child(3)', 'aria-checked', 'true');

    // toggle click on 3 button
    browser.click(".uk-button-group[data-uk-button-checkbox] button:nth-child(3)");
    browser.assert.cssClassNotPresent(".uk-button-group[data-uk-button-checkbox] button:nth-child(1)", 'uk-active');
    browser.assert.cssClassNotPresent(".uk-button-group[data-uk-button-checkbox] button:nth-child(2)", 'uk-active');
    browser.assert.cssClassNotPresent(".uk-button-group[data-uk-button-checkbox] button:nth-child(3)", 'uk-active');
    // check attributes
    browser.assert.attributeContains('.uk-button-group[data-uk-button-checkbox] button:nth-child(1)', 'aria-checked', 'false');
    browser.assert.attributeContains('.uk-button-group[data-uk-button-checkbox] button:nth-child(2)', 'aria-checked', 'false');
    browser.assert.attributeContains('.uk-button-group[data-uk-button-checkbox] button:nth-child(3)', 'aria-checked', 'false');

    browser.end();
  }
};
