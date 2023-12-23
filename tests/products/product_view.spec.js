// @ts-check
import { faker } from '@faker-js/faker/locale/en';
const { ProductViewPage } = require('../../pages/products/product_view_page');
const { test, expect } = require('@playwright/test');

test.describe('View product', () => {
  test('should view product details', async ({ page }) => {

    let productData = {
      title: faker.commerce.productName(), 
      description: faker.commerce.productDescription(),
      image_url: faker.image.urlPicsumPhotos(),
      price: faker.commerce.price()
    };

    postData('http://localhost:3000/products.json', productData).then((data) => {
      page.goto(`http://localhost:3000/products/${data['id']}`);
    });

    const productViewPage = new ProductViewPage(page);
    await productViewPage.verifyProductDetails(productData);
  });

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