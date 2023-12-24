const { expect } = require('@playwright/test');
const { BasePage } = require('../base_page');
import { faker } from '@faker-js/faker/locale/en';

export class ProductViewPage extends BasePage {
    constructor(page) {
      super(page);
      this.page = page;
      this.productTitleLabel = page.locator("#product_preview_title");
      this.productDescriptionLabel = page.locator("#product_preview_description");
      this.productImageUrlLabel = page.locator("#product_preview_image_url");
      this.productPriceLabel = page.locator("#product_preview_price");
      this.destroyProductButton = page.getByText('Destroy this product');
    }

    async verifyProductDetails(params) {
      await expect(this.productTitleLabel).toContainText(params['title']);
      await expect(this.productDescriptionLabel).toContainText(params['description']);
      await expect(this.productImageUrlLabel).toContainText(params['image_url']);
      await expect(this.productPriceLabel).toContainText(params['price'].slice(0,-1));
    }

    async clickDestroyButton(){
      await this.destroyProductButton.click();
    }
  };