import ApiClient from "../src/classes/ApiClient"

// Set up the API client
let apiClient = new ApiClient('/api/users')

async function getUsers() {
    try {
        const users = await apiClient.getAsync();
        console.log('Fetched Users:', users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

let users = await getUsers()
