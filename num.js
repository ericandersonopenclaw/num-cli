#!/usr/bin/env node

// num - Number trivia
// Usage: num [number]

const args = process.argv.slice(2);

if (!args[0] || args.includes('--help')) {
  console.log(`num 🔢 - Number trivia

Usage: num [number]

Examples:
  num        Random number fact
  num 42     Fact about 42
`);
  process.exit(0);
}

const https = require('https');

function fetchFact(n) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.mathjs.org',
      path: `/v4/?expr=${encodeURIComponent(n)}`,
      method: 'GET'
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const n = args[0];
  try {
    const result = await fetchFact(n);
    console.log('\n🔢 ' + n + ' = ' + result.trim() + '\n');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();