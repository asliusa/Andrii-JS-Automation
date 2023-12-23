const { expect } = require('@playwright/test');

exports.BasePage = class BasePage {
    constructor(page) {
      this.page = page;
      this.notice = page.locator("#notice");
    }
  
    async verifyNoticeMessage(message) {
        await expect(this.notice).toHaveText(message);
    }
  };