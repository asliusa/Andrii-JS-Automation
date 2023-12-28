import { faker } from '@faker-js/faker/locale/en';
 
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

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  async function convertToPrice(value){
    return formatter.format(value)
  }

  async function randomProductData(){
    return {
      title: faker.commerce.productName(), 
      description: faker.commerce.productDescription(),
      image_url: faker.image.urlPicsumPhotos(),
      price: faker.commerce.price()
    };
  }

  export { postData, convertToPrice, randomProductData };