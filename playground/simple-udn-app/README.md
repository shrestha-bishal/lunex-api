# LunexClient UMD Vanilla JavaScript Example
This example demonstrates how to use the lunex-http library’s UMD bundle in a simple HTML page with vanilla JavaScript.You can load the UMD bundle either via CDN or locally from the installed package.

### Using the UMD bundle via CDN
- Include the LunexClient UMD bundle from a CDN in your HTML.
- Replace @version with your desired version number or remove it to use the latest.

> jsDelivr CDN (specify version or omit for latest):
```html
<script src="https://cdn.jsdelivr.net/npm/lunex-http@version/dist/umd/lunex-http.umd.js"></script>
```

> unpkg CDN (latest version):
```html
<script src="https://unpkg.com/lunex-http/dist/umd/lunex-http.umd.js"></script>
```

### Using the UMD bundle locally
- Install the package via npm:
```bash
npm install lunex-http
```
- Copy the UMD bundle from the package to your project’s public folder (adjust paths as needed):
```bash
cp node_modules/lunex-http/build/umd/lunex-http.umd.js ./public/umd/
```

- Reference the local UMD bundle in your HTML:

```html
<script src="umd/lunex-http.umd.js"></script>
```

Serve your project with a static server (e.g., npx serve .) for best compatibility, especially if you use modules or local API calls. For simple examples like this, you can also open the HTML file directly in your browser without a server, and it should work fine.

### Example HTML (works for both CDN and local usage)

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>LunexClient UMD Example</title>

        <!--
            - CDN:
            <script src="https://unpkg.com/lunex-http/dist/umd/lunex-http.umd.js"></script>

            - Local:
            <script src="umd/lunex-http.umd.js"></script>
        -->

        <!-- CDN via jsdelivr -->
        <script src="https://cdn.jsdelivr.net/npm/lunex-http/dist/umd/lunex-http.umd.js"></script>
    </head>

    <body>
        <div id="output">Loading...</div>

        <script>
            const output = document.getElementById('output');

            // Access classes from the UMD global object
            const LunexClient = window.LunexClient.default;
            const LunexClientOptions = window.LunexClient.LunexClientOptions;

            const options = new LunexClientOptions({
            timeout: 8000,
            maxRetries: 2,
            });

            const client = new LunexClient('https://jsonplaceholder.typicode.com', {}, options);

            async function fetchUsers() {
            try {
                const users = await client.getAsync('users');
                output.innerHTML = `<pre>${JSON.stringify(users, null, 2)}</pre>`;
            } catch (error) {
                output.textContent = 'Error fetching users: ' + error.message;
            }
            }

            fetchUsers();
        </script>
    </body>
</html>
```

## Notes
- The UMD build is located in the package under node_modules/lunex-http/build/umd/lunex-http.umd.js.
- When using locally, copy this file into your public directory for static serving.
- When using CDN, no local file is needed.
- Replace API URLs and package version as needed.