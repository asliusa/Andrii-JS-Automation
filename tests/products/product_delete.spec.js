// @ts-check
import { faker } from '@faker-js/faker/locale/en';
const { ProductFormPage } = require('../../pages/products/product_form_page');
const { ProductViewPage } = require('../../pages/products/product_view_page');
const { ProductsPage } = require('../../pages/products/products_page');
const { test, expect } = require('@playwright/test');
import { postData } from '../helpers';

test.describe('Delete product', () => {
  test('should delete product from product view page', async ({ page }) => {

    postData('http://localhost:3000/products.json', {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image_url: faker.image.urlPicsumPhotos(),
      price: faker.commerce.price()
    }).then((data) => {
      page.goto(`http://localhost:3000/products/${data['id']}`);
    });

    const productViewPage = new ProductViewPage(page);
    await productViewPage.clickDestroyButton();
    await expect(page).toHaveURL('http://localhost:3000/products');
    const productsPage = new ProductViewPage(page);
    productsPage.verifyNoticeMessage('Product was successfully destroyed.');
  });

  test('should delete product from products list page', async ({ page }) => {

    let productData = {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image_url: faker.image.urlPicsumPhotos(),
      price: faker.commerce.price()
    }

    await postData('http://localhost:3000/products.json', productData);
    await page.goto(`http://localhost:3000/products`)

    const productsPage = new ProductsPage(page);
    await productsPage.clickDestroyButton(productData.title);
    const productViewPage = new ProductViewPage(page);
    await productViewPage.verifyProductDetails(productData);
    await productViewPage.clickDestroyButton();
    await productsPage.verifyNoticeMessage('Product was successfully destroyed.');
  });
});