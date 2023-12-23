// @ts-check
import { faker } from '@faker-js/faker/locale/en';
const { ProductFormPage } = require('../../pages/products/product_form_page');
const { ProductViewPage } = require('../../pages/products/product_view_page');
const { ProductsPage } = require('../../pages/products/products_page');
const { test, expect } = require('@playwright/test');

test.describe('Delete product', () => {
  test('should delete product from view page', async ({ page }) => {

    postData('http://localhost:3000/products.json', {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image_url: faker.image.urlPicsumPhotos(),
      price: 200
    }).then((data) => {
      page.goto(`http://localhost:3000/products/${data['id']}`);
    });

    const productViewPage = new ProductViewPage(page);
    await productViewPage.clickDestroyButton();
    await expect(page).toHaveURL('http://localhost:3000/products');
    const productsPage = new ProductViewPage(page);
    productsPage.verifyNoticeMessage('Product was successfully destroyed.');
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