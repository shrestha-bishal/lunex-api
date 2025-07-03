import RestClient from 'https://esm.sh/lunex-http';

const output = document.getElementById('output');

const client = new RestClient('https://jsonplaceholder.typicode.com');

async function fetchUsers() {
  try {
    const users = await client.getAsync('users');
    output.innerHTML = `<pre>${JSON.stringify(users, null, 2)}</pre>`;
  } catch (error) {
    output.textContent = 'Error fetching users: ' + error.message;
  }
}

fetchUsers();
