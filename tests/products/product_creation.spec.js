// @ts-check
import { faker } from '@faker-js/faker/locale/en';
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/products/new');
});

test.describe('New product creation', () => {
  test('should add new valid product', async ({ page }) => {
    // page.getByText('New product').click();

    // let randomProductName = faker.commerce.productName();
    // let randomProductDescription = faker.commerce.productDescription();
    // let randomProductImageUrl = faker.image.urlPicsumPhotos();
    // let randomProductPrice = faker.commerce.price();
    
    let randomProduct = {
      title: faker.commerce.productName(), 
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.urlPicsumPhotos(),
      price: faker.commerce.price()
    };

    fillInProductDetails(page, randomProduct);

    // await page.locator("#product_title5").fill(randomProductName);
    // await page.locator("#product_description").fill(randomProductDescription);
    // await page.locator("#product_image_url").fill(randomProductImageUrl);
    // await page.locator("#product_price").fill(randomProductPrice);

    const createProductButton = page.getByText('Create Product');
    createProductButton.click();

    const notice = page.locator("#notice");
    await expect(notice).toHaveText('Product was successfully created.');

    await expect(page.locator("#product_preview_title")).toContainText(randomProduct['title']);
    await expect(page.locator("#product_preview_description")).toContainText(randomProduct['description']);
    await expect(page.locator("#product_preview_image_url")).toContainText(randomProduct['imageUrl']);
    await expect(page.locator("#product_preview_price")).toContainText(randomProduct['price'].slice(0,-1));
  });

  // test('should show validation for missing product title', async ({ page }) => {
    
  //   await page.locator("#product_description").fill(randomProductDescription);
  //   await page.locator("#product_image_url").fill(randomProductImageUrl);
  //   await page.locator("#product_price").fill(randomProductPrice);

  //   const createProductButton = page.getByText('Create Product');
  //   await createProductButton.click();

  //   const notice = page.locator("#notice");
  //   await expect(notice).toHaveText('Product was successfully created.');

  //   await expect(page.locator("#product_preview_title")).toContainText(randomProductName);
  //   await expect(page.locator("#product_preview_description")).toContainText(randomProductDescription);
  //   await expect(page.locator("#product_preview_image_url")).toContainText(randomProductImageUrl);
  //   await expect(page.locator("#product_preview_price")).toContainText(randomProductPrice.slice(0,-1));
  // });

  function fillInProductDetails(page, params){
    page.locator("#product_title5").fill(params['title']);
    page.locator("#product_description").fill(params['description']);
    page.locator("#product_image_url").fill(params['imageUrl']);
    page.locator("#product_price").fill(params['price']);
  }

});