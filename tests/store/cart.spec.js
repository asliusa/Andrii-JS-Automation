// @ts-check
import { faker } from '@faker-js/faker/locale/en';
const { StorePage } = require('../../pages/store/store_page');
const { test, expect } = require('@playwright/test');
import { postData, convertToPrice, randomProductData } from '../helpers';

test.describe('Cart opetations', () => {
  test('should add single product to cart', async ({ page }) => {
    let productData = await randomProductData();
    await postData('http://localhost:3000/products.json', productData);
    await page.goto("http://localhost:3000/");

    const storePage = new StorePage(page);
    await storePage.clickAddToCartButton(productData['title']);
    await storePage.verifyProductTitleInCart(productData['title']);
    await storePage.verifyProductPriceInCart(await convertToPrice(Number(productData['price'])));
    await storePage.verifyCartTotal(await convertToPrice(Number(productData['price'])));
  });

  test('should add multiple products to cart and verify total', async ({ page }) => {
    let product1Data = await randomProductData();
    let product2Data = await randomProductData();
    await postData('http://localhost:3000/products.json', product1Data);
    await postData('http://localhost:3000/products.json', product2Data);
    await page.goto("http://localhost:3000/");

    const storePage = new StorePage(page);
    await storePage.clickAddToCartButton(product1Data['title']);
    await storePage.clickAddToCartButton(product2Data['title']);
    await storePage.verifyCartTotal(await convertToPrice(Number(product1Data['price'])+Number(product2Data['price'])));
  });

});