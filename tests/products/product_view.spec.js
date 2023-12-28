// @ts-check
import { faker } from '@faker-js/faker/locale/en';
const { ProductViewPage } = require('../../pages/products/product_view_page');
const { test, expect } = require('@playwright/test');
import { postData, randomProductData } from '../helpers';

test.describe('View product', () => {
  test('should view product details', async ({ page }) => {
    let productData = await randomProductData();

    postData('http://localhost:3000/products.json', productData).then((data) => {
      page.goto(`http://localhost:3000/products/${data['id']}`);
    });

    const productViewPage = new ProductViewPage(page);
    await productViewPage.verifyProductDetails(productData);
  });

});