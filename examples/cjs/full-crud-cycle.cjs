/**
 * Example: Full CRUD cycle using RestClient
 *
 * This script demonstrates creating, reading, updating, and deleting a user resource
 * via RESTful API endpoints.
 */

const { RestClient } = require('@bishal-shrestha/rest-client');

const client = new RestClient('https://api.example.com');

(async () => {
  try {
    // CREATE - POST new user
    const newUser = await client.postAsync('users', {
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'user'
    });
    console.log('User created:', newUser);

    const userId = newUser.id;

    // READ - GET the created user
    const fetchedUser = await client.getAsync(`users/${userId}`);
    console.log('User fetched:', fetchedUser);

    // UPDATE - PUT update user info
    const updatedUser = await client.putAsync(`users/${userId}`, {
      name: 'John Doe Jr.',
      email: 'johnjr.doe@example.com',
      role: 'admin'
    });
    console.log('User updated:', updatedUser);

    // DELETE - DELETE the user
    await client.deleteAsync(`users/${userId}`);
    console.log(`User with ID ${userId} deleted successfully.`);

  } catch (error) {
    console.error('Error during full CRUD cycle:', error);
  }
})();
