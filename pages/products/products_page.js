const { expect } = require('@playwright/test');
const { BasePage } = require('../base_page');

export class ProductsPage extends BasePage {
    constructor(page) {
      super(page);
      this.page = page;
    }

    async clickDestroyButton(productName){
      await this.page.locator(`xpath=//h1[.='${productName}']/../..//a[.='Destroy']`).click();
    }
  };