// @ts-check
import { faker } from '@faker-js/faker/locale/en';
const { ProductFormPage } = require('../../pages/products/product_form_page');
const { ProductViewPage } = require('../../pages/products/product_view_page');
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  const productFormPage = new ProductFormPage(page);
  await productFormPage.goto();
});

test.describe('New product creation', () => {
  test('should add new valid product', async ({ page }) => {
    let randomProduct = {
      title: faker.commerce.productName(), 
      description: faker.commerce.productDescription(),
      image_url: faker.image.urlPicsumPhotos(),
      price: faker.commerce.price()
    };
    const productFormPage = new ProductFormPage(page);
    await productFormPage.fillInProductDetails(randomProduct);
    await productFormPage.clickCreateButton();
    await productFormPage.verifyNoticeMessage('Product was successfully created.');
    const productViewPage = new ProductViewPage(page);
    await productViewPage.verifyProductDetails(randomProduct);
  });

  test('should validate empty product title', async ({ page }) => {
    const productFormPage = new ProductFormPage(page);
    await productFormPage.fillInProductDetails({ title: ' ' });
    await productFormPage.clickCreateButton();
    await productFormPage.verifyValidationMessage('1 error prohibited this product from being saved:');
    await productFormPage.verifyValidationMessage("Title can't be blank");
  });

  test('should validate empty product description', async ({ page }) => {
    const productFormPage = new ProductFormPage(page);
    await productFormPage.fillInProductDetails({ description: ' ' });
    await productFormPage.clickCreateButton();
    await productFormPage.verifyValidationMessage('1 error prohibited this product from being saved:');
    await productFormPage.verifyValidationMessage("Description can't be blank");
  });

  test('should validate empty product imageURL', async ({ page }) => {
    const productFormPage = new ProductFormPage(page);
    await productFormPage.fillInProductDetails({ image_url: ' ' });
    await productFormPage.clickCreateButton();
    await productFormPage.verifyValidationMessage('1 error prohibited this product from being saved:');
    await productFormPage.verifyValidationMessage(`Image url can't be blank`);
  });

  test('should validate non-number product price', async ({ page }) => {
    const productFormPage = new ProductFormPage(page);
    await productFormPage.fillInProductDetails({ price: 'zero' });
    await productFormPage.clickCreateButton();
    await productFormPage.verifyValidationMessage('1 error prohibited this product from being saved:');
    await productFormPage.verifyValidationMessage(`Price is not a number`);
  });

});