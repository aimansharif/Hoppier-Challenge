const fv_snack = require('fs');

const solve = (products, snackers) => {
  console.log("Question 1: Real stocked snacks \n");
  const favorite_snacks = new Set();
  for (let i = 0; i < snackers.length; i++) {
    const snacker = snackers[i];
    favorite_snacks.add(snacker.fave_snack);
  }

  const product_names = new Set();
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    product_names.add(product.title);
  }

  const intersection = new Set([...favorite_snacks].filter(x => product_names.has(x)));
  [...intersection].map(snack => console.log(snack));

  console.log('\nQuestion 2: emails of of snackers listed as fave_snack\n');
  const snackers_with_fave = [];
  for (let i = 0; i < snackers.length; i++) {
    const snacker = snackers[i];
    if (intersection.has(snacker.fave_snack)) {
      snackers_with_fave.push(snacker);
      console.log(snacker.email);
    }
  }

  console.log('\nQuestion 3\n');
  let total_cost = 0.0;
  const price_mapping = {};
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    price_mapping[product.title] = parseFloat(product.variants[0].price);
  }
  for (let i = 0; i < snackers_with_fave.length; i++) {
    const snacker = snackers_with_fave[i];
    total_cost += price_mapping[snacker.fave_snack];
  }
  console.log("Total price: " + `$${total_cost}`);
};

fv_snack.readFile('products.json', 'utf8', (err, data) => {
  const products = JSON.parse(data)['products'];
  fv_snack.readFile('MOCK_SNACKER_DATA.json', 'utf8', (err, data) => {
    const snackers = JSON.parse(data);
    solve(products, snackers);
  });
});
