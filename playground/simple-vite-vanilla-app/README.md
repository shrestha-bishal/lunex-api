# Lunex HTTP Vite with Vanilla Simple App Example
This is a minimal vanilla JavaScript example demonstrating how to use the lunex-http library inside a Vite project.

## How to run this example
- Make sure you have Node.js installed.
- Install dependencies:
```
npm install
npm install lunex-http
```
- Run the development server:
```
npm run dev
```
- Open the URL printed by Vite (usually `http://localhost:5173`) in your browser.

## What this example shows
- How to import and instantiate LunexClient in a vanilla JavaScript environment using ES modules.
- How to make an asynchronous GET request using getAsync.

## Example code snippet (src/main.js)
```js
import './style.css'
import LunexClient from 'lunex-http'

document.querySelector('#app').innerHTML = `Hello World`

const client = new LunexClient('https://api.example.com/')
console.log('LunexClient created')

let response = await client.getAsync('users')
console.log(response)
```