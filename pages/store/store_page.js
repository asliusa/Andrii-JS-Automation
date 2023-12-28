const { expect } = require('@playwright/test');
const { BasePage } = require('../base_page');

export class StorePage extends BasePage {
    constructor(page) {
      super(page);
      this.page = page;
      this.cartTitle = page.getByText('Your Cart');
      this.cartProductTitle = page.locator('#cart_product_title');
      this.cartTotalPrice = page.locator('#cart_total_price');
    }

    async clickAddToCartButton(productName){
      await this.page.locator(`xpath=//h2[.='${productName}']/..//input[@value = 'Add to Cart']`).click();
    }

    async verifyProductTitleInCart(title) {
      await expect(this.cartTitle).toBeVisible;
      await expect(this.cartProductTitle).toContainText(title);
    }

    async verifyProductPriceInCart(price) {
      await expect(this.cartProductTitle.locator(`xpath=../td[@id='cart_product_price']`)).toContainText(price);
    }

    async verifyCartTotal(total) {
      await expect(this.cartTotalPrice).toContainText(total)
    }
  };