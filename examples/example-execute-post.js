import ApiClient from '../src/classes/ApiClient';
import ActionPayload from '../src/classes/ActionPayload';

// Initialize the API client
const apiClient = new ApiClient('/api/users');

async function executeCreateUser(userData) {
    const payload = new ActionPayload('create', userData);

    try {
        var response = await apiClient.executePostAsync(payload);
        console.log('Executed User Creation:', response);
    } catch (error) {
        console.error('Error executing user creation:', error);
    }
}

executeCreateUser({ name: 'Example User', email: 'exampleuser@example.com' });
