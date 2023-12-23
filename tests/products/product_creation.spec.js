// @ts-check
import { faker } from '@faker-js/faker/locale/en';
const { ProductCreateFormPage } = require('../../pages/products/product_create_form_page');
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  const productCreateFormPage = new ProductCreateFormPage(page);
  await productCreateFormPage.goto();
});

test.describe('New product creation', () => {
  test('should add new valid product', async ({ page }) => {
    let randomProduct = {
      title: faker.commerce.productName(), 
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.urlPicsumPhotos(),
      price: faker.commerce.price()
    };
    const productCreateFormPage = new ProductCreateFormPage(page);
    await productCreateFormPage.fillInProductDetails(randomProduct);
    await productCreateFormPage.verifyNoticeMessage('Product was successfully created.');

    await expect(page.locator("#product_preview_title")).toContainText(randomProduct['title']);
    await expect(page.locator("#product_preview_description")).toContainText(randomProduct['description']);
    await expect(page.locator("#product_preview_image_url")).toContainText(randomProduct['imageUrl']);
    await expect(page.locator("#product_preview_price")).toContainText(randomProduct['price'].slice(0,-1));
  });

  test('should validate empty product title', async ({ page }) => {
    const productCreateFormPage = new ProductCreateFormPage(page);
    await productCreateFormPage.fillInProductDetails({ title: ' ' });
    await productCreateFormPage.verifyValidationMessage('1 error prohibited this product from being saved:');
    await productCreateFormPage.verifyValidationMessage("Title can't be blank");
  });

  test('should validate empty product description', async ({ page }) => {
    const productCreateFormPage = new ProductCreateFormPage(page);
    await productCreateFormPage.fillInProductDetails({ description: ' ' });
    await productCreateFormPage.verifyValidationMessage('1 error prohibited this product from being saved:');
    await productCreateFormPage.verifyValidationMessage("Description can't be blank");
  });

  test('should validate empty product imageURL', async ({ page }) => {
    const productCreateFormPage = new ProductCreateFormPage(page);
    await productCreateFormPage.fillInProductDetails({ imageUrl: ' ' });
    await productCreateFormPage.verifyValidationMessage('1 error prohibited this product from being saved:');
    await productCreateFormPage.verifyValidationMessage(`Image url can't be blank`);
  });

  test('should validate non-number product price', async ({ page }) => {
    const productCreateFormPage = new ProductCreateFormPage(page);
    await productCreateFormPage.fillInProductDetails({ price: 'zero' });
    await productCreateFormPage.verifyValidationMessage('1 error prohibited this product from being saved:');
    await productCreateFormPage.verifyValidationMessage(`Price is not a number`);
  });

});