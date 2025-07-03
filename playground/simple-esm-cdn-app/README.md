# LunexClient Vanilla JavaScript ESM CDN Simple App Example
This is a minimal vanilla JavaScript example demonstrating how to use the lunex-http library by importing it directly from an ESM CDN (esm.sh). It runs in modern browsers without bundlers or build tools.

### How to run this example
- Simply open the index.html file in a modern browser that supports ES modules.

Note: For full functionality (e.g., making API calls to your backend), serve the app over HTTP using a local server (e.g., Apache, http-server, or python -m http.server) to avoid CORS and module loading restrictions.

### What this example shows
- How to import LunexClient from the ESM CDN in a vanilla JS module.
- How to instantiate LunexClient pointing to an API endpoint.
- How to make an asynchronous GET request using getAsync.

### Example code snippet (main.js)
```js
import LunexClient from 'https://esm.sh/lunex-http';

const output = document.getElementById('output');

const client = new LunexClient('https://jsonplaceholder.typicode.com');

async function fetchUsers() {
  try {
    const users = await client.getAsync('users');
    output.innerHTML = `<pre>${JSON.stringify(users, null, 2)}</pre>`;
  } catch (error) {
    output.textContent = 'Error fetching users: ' + error.message;
  }
}

fetchUsers();
```

```html
<div id="output">Loading...</div>
<script type="module" src="main.js"></script>
```

### Notes
- This example requires a modern browser with ES module support.
- For local API requests, ensure CORS is properly configured on the backend or run your frontend from a local server.
- No build tools or package installation needed, since the library is loaded via CDN.