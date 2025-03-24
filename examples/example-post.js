import ApiClient from '../src/classes/ApiClient';
import ActionPayload from '../src/classes/ActionPayload';

// Initialize the API client
const apiClient = new ApiClient('/api/users');

async function createUser(userData) {
    const payload = new ActionPayload('create', userData);

    try {
        const response = await apiClient.postAsync(payload);
        console.log('User Created:', response);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

createUser({ name: 'Example User', email: 'exampleuser@example.com' });
