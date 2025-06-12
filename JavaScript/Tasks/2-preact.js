'use strict';

// npm install @preact/signals-core --save
const { signal, computed } = require('@preact/signals-core');

// Task: rewrite code to use preact `computed` signal
// for calculation purchase total

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

const items = signal(electronics);

const total = computed(() =>
  items.value.reduce((sum, item) => sum + item.price, 0)
);

console.log(`Total: ${total.value}`);
console.log(computed);
