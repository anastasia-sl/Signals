import { signal, computed } from '@angular/core';

// npm install @angular/core --save
// yarn add @angular/core

// Task: rewrite code to use angular `computed` signal
// for calculation purchase total

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

const items = signal(electronics);

const total = computed(() => 
  items().reduce((sum, item) => sum + item.price, 0)
);

console.log(`Total: ${total()}`);
console.log(computed);
