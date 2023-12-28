const { expect } = require('@playwright/test');
const { BasePage } = require('../base_page');

export class StorePage extends BasePage {
    constructor(page) {
      super(page);
      this.page = page;
      this.cartTitle = page.getByText('Your Cart');
      this.cartTotalPrice = page.locator('#cart_total_price');
    }

    async clickAddToCartButton(productName){
      await this.page.locator(`xpath=//h2[.='${productName}']/..//input[@value = 'Add to Cart']`).click();
    }

    async verifyProductInCart(product) {
      await expect(this.cartTitle).toBeVisible
      await expect(this.page.locator(`//div[@id='cart']//td[.='${product['title']}']`)).toBeVisible
      await expect(this.page.locator(`//div[@id='cart']//td[.='${product['price']}']`)).toBeVisible
    }

    async verifyCartTotal(price) {
      await expect(this.cartTotalPrice).toContainText(`$${price.slice(0,-1)}`)
    }
  };