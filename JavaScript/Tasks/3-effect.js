'use strict';

// npm install @preact/signals-core --save
const { signal, effect } = require('@preact/signals-core');

// Task: rewrite code to use preact `effect` function;
// implement iteration to increment total
// and printing purchase total after each change

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

const total = signal(0);

const items = signal([...electronics]);

effect(() => {
  let sum = 0;
  for (const item of items.value) {
    sum += item.price;
  }
  
  total.value = sum;
  
  console.log('Current state');
  console.log('Items:', items.value);
  console.log('Total:', total.value);
});

console.log('\nInitial state:');

setTimeout(() => {
  console.log('\nAdding a new item');
  items.value = [...items.value, { name: 'Mouse', price: 50 }];
}, 1000);

setTimeout(() => {
  console.log('\nRemoving an item');
  items.value = items.value.filter(item => item.name !== 'Keyboard');
}, 2000);

setTimeout(() => {
  console.log('\nUpdating item price');
  items.value = items.value.map(item => 
    item.name === 'Laptop' ? {...item, price: 1600} : item
  );
}, 3000);