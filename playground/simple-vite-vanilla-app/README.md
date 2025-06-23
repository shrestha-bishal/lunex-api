# RestClient Vite with Vanilla Simple App Example
This is a minimal vanilla JavaScript example demonstrating how to use the @bishal-shrestha/rest-client library inside a Vite project.

## How to run this example
- Make sure you have Node.js installed.
- Install dependencies:
```
npm install
npm install @bishal-shrestha/rest-client
```
- Run the development server:
```
npm run dev
```
- Open the URL printed by Vite (usually `http://localhost:5173`) in your browser.

## What this example shows
- How to import and instantiate RestClient in a vanilla JavaScript environment using ES modules.
- How to make an asynchronous GET request using getAsync.

## Example code snippet (src/main.js)
```js
import './style.css'
import RestClient from '@bishal-shrestha/rest-client'

document.querySelector('#app').innerHTML = `Hello World`

const client = new RestClient('https://api.example.com/')
console.log('RestClient created')

let response = await client.getAsync('users')
console.log(response)
```