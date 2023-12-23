const { expect } = require('@playwright/test');
const { BasePage } = require('../base_page');
import { faker } from '@faker-js/faker/locale/en';

exports.ProductFormPage = class ProductFormPage extends BasePage {
    constructor(page) {
      super(page);
      this.page = page;
      this.productTitleInput = page.locator("#product_title5");
      this.productDescriptionInput = page.locator("#product_description");
      this.productImageUrlInput = page.locator("#product_image_url");
      this.productPriceInput = page.locator("#product_price");
      this.createProductButton = page.getByText('Create Product');
      this.updateProductButton = page.getByText('Update Product');
      this.validationErrorLabel = page.locator("#error_explanation");
    }
  
    async goto() {
      await this.page.goto('http://localhost:3000/products/new');
    }
  
    async fillInProductDetails(params) {
      await this.productTitleInput.fill(params['title'] || faker.commerce.productName() );
      await this.productDescriptionInput.fill(params['description'] || faker.commerce.productDescription());
      await this.productImageUrlInput.fill(params['imageUrl'] || faker.image.urlPicsumPhotos());
      await this.productPriceInput.fill(params['price'] || faker.commerce.price());
    }

    async clickCreateButton() {
      await this.createProductButton.click();
    }

    async clickUpdateButton() {
      await this.updateProductButton.click();
    }

    async verifyValidationMessage(message) {
      await expect(this.validationErrorLabel).toContainText(message);
    }
  };