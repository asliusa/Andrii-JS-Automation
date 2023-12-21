// @ts-check
import { faker } from '@faker-js/faker/locale/en';
const { test, expect } = require('@playwright/test');

test.describe('Edit product', () => {
  test('should add new valid product', async ({ page }) => {

    postData('http://localhost:3000/products.json', {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image_url: faker.image.urlPicsumPhotos(),
      price: 200
    }).then((data) => {
      page.goto(`http://localhost:3000/products/${data['id']}/edit`);
    });

    await expect(page.locator('#edit_product_title')).toHaveText('Editing product');

    let randomProduct = {
      title: faker.commerce.productName(), 
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.urlPicsumPhotos(),
      price: faker.commerce.price()
    };

    fillInProductDetails(page, randomProduct);

    await expect(page.locator("#notice")).toHaveText('Product was successfully updated.');
    await expect(page.locator("#product_preview_title")).toContainText(randomProduct['title']);
    await expect(page.locator("#product_preview_description")).toContainText(randomProduct['description']);
    await expect(page.locator("#product_preview_image_url")).toContainText(randomProduct['imageUrl']);
    await expect(page.locator("#product_preview_price")).toContainText(randomProduct['price'].slice(0,-1));
  });

  async function fillInProductDetails(page, params){
    await page.locator("#product_title5").fill(params['title']);
    await page.locator("#product_description").fill(params['description']);
    await page.locator("#product_image_url").fill(params['imageUrl']);
    await page.locator("#product_price").fill(params['price']);
    const updateProductButton = page.getByText('Update Product');
    await updateProductButton.click();
  }

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

});