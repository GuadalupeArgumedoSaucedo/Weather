// Define the base URL for the API
const baseURL = 'http://yearupdemoapi.azurewebsites.net/api/users';
// Function to fetch all users
const fetchAllUsers = async () => {
    try {
        const response = await fetch(baseURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        console.log('All Users:', users);
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
};
// Call the fetchAllUsers function
//fetchAllUsers();

const fetchUser = async (userId) => {
    try {
        const response = await fetch(`${baseURL}/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const user = await response.json();
        console.log('User Info:', user);
    } catch (error) {
        console.error('Failed to fetch user:', error);
    }
};

// Call the fetchUser function with the user ID
fetchUser('4');