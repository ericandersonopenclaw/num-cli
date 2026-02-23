#!/usr/bin/env bun
const n = parseFloat(process.argv[2]);
console.log(Number.isInteger(n) ? n : n.toFixed(2));
