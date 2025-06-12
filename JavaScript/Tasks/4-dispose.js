'use strict';

// npm install @preact/signals-core --save
const { signal, effect } = require('@preact/signals-core');

// Task: rewrite code to use preact `effect` and `dispose`;
// implement iteration to increment total and print it
// until total become greater than PURCHASE_LIMIT,
// do not stop iteration after that but just prevent
// printing purchase total

const PURCHASE_LIMIT = 1600;

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

const total = signal(0);
const items = signal([...electronics]);

let disposeEffect = null;

function addRandomItem() {
  const randomItems = [
    { name: 'Mouse', price: 50 },
    { name: 'Monitor', price: 200 },
    { name: 'Headphones', price: 80 },
    { name: 'USB Cable', price: 15 }
  ];
  
  const randomItem = randomItems[Math.floor(Math.random() * randomItems.length)];
  items.value = [...items.value, randomItem];
  return randomItem;
}

disposeEffect = effect(() => {
  total.value = items.value.reduce((sum, item) => sum + item.price, 0);
  
  if (total.value <= PURCHASE_LIMIT) {
    console.log('Current purchase');
    console.log('Items:', items.value.map(i => `${i.name}: $${i.price}`).join(', '));
    console.log(`Total: $${total.value} (Limit: $${PURCHASE_LIMIT})`);
  }
});

const interval = setInterval(() => {
  if (total.value > PURCHASE_LIMIT * 2) {
    clearInterval(interval);
    if (disposeEffect) disposeEffect();
    console.log(`Final total: $${total.value} (Process stopped)`);
    return;
  }
  
  const newItem = addRandomItem();
  console.log(`Added: ${newItem.name} for $${newItem.price}`);
  
  if (total.value > PURCHASE_LIMIT && disposeEffect) {
    console.log(`\n Limit exceeded ($${total.value} > $${PURCHASE_LIMIT}), stopping output\n`);
    disposeEffect();
    disposeEffect = null;
  }
}, 1000);

setTimeout(() => {
  if (interval) clearInterval(interval);
  if (disposeEffect) disposeEffect();
  console.log(`Final total: $${total.value} (Timeout reached)`);
}, 10000);