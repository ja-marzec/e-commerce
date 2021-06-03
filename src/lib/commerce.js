import Commerce from '@chec/commerce.js';

console.log(process.env.REACT_APP_COMMERCE_PUBLIC);
export const commerce = new Commerce(process.env.REACT_APP_COMMERCE_PUBLIC, true);