// @ts-check
import { faker } from '@faker-js/faker/locale/en';
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/products/new');
});

test.describe('New product creation', () => {
  test('should add new valid product', async ({ page }) => {
    let randomProduct = {
      title: faker.commerce.productName(), 
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.urlPicsumPhotos(),
      price: faker.commerce.price()
    };
    fillInProductDetails(page,randomProduct);

    const notice = page.locator("#notice");
    await expect(notice).toHaveText('Product was successfully created.');

    await expect(page.locator("#product_preview_title")).toContainText(randomProduct['title']);
    await expect(page.locator("#product_preview_description")).toContainText(randomProduct['description']);
    await expect(page.locator("#product_preview_image_url")).toContainText(randomProduct['imageUrl']);
    await expect(page.locator("#product_preview_price")).toContainText(randomProduct['price'].slice(0,-1));
  });

  test('should validate empty product title', async ({ page }) => {
    let randomProduct = {
      title: ' '
    };
    fillInProductDetails(page,randomProduct);

    const notice = page.locator("#error_explanation");
    await expect(notice).toContainText('1 error prohibited this product from being saved:');
    await expect(notice).toContainText("Title can't be blank");
  });

  test('should validate empty product description', async ({ page }) => {
    let randomProduct = {
      description: ' '
    };
    fillInProductDetails(page,randomProduct);

    const notice = page.locator("#error_explanation");
    await expect(notice).toContainText('1 error prohibited this product from being saved:');
    await expect(notice).toContainText("Description can't be blank");
  });

  test('should validate empty product imageURL', async ({ page }) => {
    let randomProduct = {
      imageUrl: ''
    };
    fillInProductDetails(page,randomProduct);

    const notice = page.locator("#error_explanation");
    await expect(notice).toContainText('1 error prohibited this product from being saved:');
    await expect(notice).toContainText("Image url can't be blank");
  });

  test('should validate non-number product price', async ({ page }) => {
    let randomProduct = {
      price: 'zero'
    };
    fillInProductDetails(page,randomProduct);

    const notice = page.locator("#error_explanation");
    await expect(notice).toContainText('1 error prohibited this product from being saved:');
    await expect(notice).toContainText("Price is not a number");
  });

  async function fillInProductDetails(page, params){
    await page.locator("#product_title5").fill(params['title'] || faker.commerce.productName() );
    await page.locator("#product_description").fill(params['description'] || faker.commerce.productDescription());
    await page.locator("#product_image_url").fill(params['imageUrl'] || faker.image.urlPicsumPhotos());
    await page.locator("#product_price").fill(params['price'] || faker.commerce.price());
    const createProductButton = page.getByText('Create Product');
    await createProductButton.click();
  }

});