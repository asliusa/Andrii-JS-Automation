// @ts-check
import { faker } from '@faker-js/faker/locale/en';
const { ProductFormPage } = require('../../pages/products/product_form_page');
const { ProductViewPage } = require('../../pages/products/product_view_page');
const { test, expect } = require('@playwright/test');
import { postData } from '../helpers';

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

    let randomProduct = {
      title: faker.commerce.productName(), 
      description: faker.commerce.productDescription(),
      image_url: faker.image.urlPicsumPhotos(),
      price: faker.commerce.price()
    };
    const productFormPage = new ProductFormPage(page);
    await productFormPage.fillInProductDetails(randomProduct);
    await productFormPage.clickUpdateButton();
    await productFormPage.verifyNoticeMessage('Product was successfully updated.');

    const productViewPage = new ProductViewPage(page);
    await productViewPage.verifyProductDetails(randomProduct);
  });

});