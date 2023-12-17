// @ts-check
import { faker } from '@faker-js/faker/locale/en';
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/products');
});

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

test.describe('New product creation', () => {
  test('should add new valid product', async ({ page }) => {
    await expect(page).toHaveTitle(/Depot/);
    await expect(page).toHaveURL('http://localhost:3000/products');

    page.getByText('New product').click();
    await expect(page).toHaveURL('http://localhost:3000/products/new');

    let randomProductName = faker.commerce.productName();
    let randomProductDescription = faker.commerce.productDescription();
    let randomProductImageUrl = faker.image.urlPicsumPhotos();
    let randomProductPrice = faker.commerce.price();
    
    const productTitleInput = page.locator("#product_title5");
    await productTitleInput.fill(randomProductName);
    const productDescriptionInput = page.locator("#product_description");
    await productDescriptionInput.fill(randomProductDescription);
    const productDescriptionImageUrl = page.locator("#product_image_url");
    await productDescriptionImageUrl.fill(randomProductImageUrl);
    const productDescriptionPrice = page.locator("#product_price");
    await productDescriptionPrice.fill(randomProductPrice);

    const createProductButton = page.getByText('Create Product');
    await createProductButton.click();
    await expect(page).toHaveURL('http://localhost:3000/products');
  });

});