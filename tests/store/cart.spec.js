// @ts-check
import { faker } from '@faker-js/faker/locale/en';
const { StorePage } = require('../../pages/store/store_page');
const { test, expect } = require('@playwright/test');
import { postData } from '../helpers';

test.describe('Cart opetations', () => {
  test('should add single product to cart', async ({ page }) => {

    let productData = {
      title: faker.commerce.productName(), 
      description: faker.commerce.productDescription(),
      image_url: faker.image.urlPicsumPhotos(),
      price: faker.commerce.price()
    };

    await postData('http://localhost:3000/products.json', productData);
    await page.goto("http://localhost:3000/");

    const storePage = new StorePage(page);
    await storePage.clickAddToCartButton(productData['title']);
    await storePage.verifyProductInCart(productData);
    await storePage.verifyCartTotal(productData['price']);
  });

});