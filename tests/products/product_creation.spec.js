// @ts-check
import { faker } from '@faker-js/faker/locale/en';
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/products');
});

test.describe('New product creation', () => {
  test('should add new valid product', async ({ page }) => {
    page.getByText('New product').click();
    await expect(page).toHaveURL('http://localhost:3000/products/new');

    let randomProductName = faker.commerce.productName();
    let randomProductDescription = faker.commerce.productDescription();
    let randomProductImageUrl = faker.image.urlPicsumPhotos();
    let randomProductPrice = faker.commerce.price();
    
    // const productTitleInput = page.locator("#product_title5");
    await page.locator("#product_title5").fill(randomProductName);
    // const productDescriptionInput = page.locator("#product_description");
    await page.locator("#product_description").fill(randomProductDescription);
    // const productDescriptionImageUrl = page.locator("#product_image_url");
    await page.locator("#product_image_url").fill(randomProductImageUrl);
    // const productDescriptionPrice = page.locator("#product_price");
    await page.locator("#product_price").fill(randomProductPrice);

    const createProductButton = page.getByText('Create Product');
    await createProductButton.click();

    const notice = page.locator("#notice");
    await expect(notice).toHaveText('Product was successfully created.');

    await expect(page.locator("#product_preview_title")).toContainText(randomProductName);
    await expect(page.locator("#product_preview_description")).toContainText(randomProductDescription);
    await expect(page.locator("#product_preview_image_url")).toContainText(randomProductImageUrl);
    await expect(page.locator("#product_preview_price")).toContainText(randomProductPrice.slice(0,-1));
  });

});