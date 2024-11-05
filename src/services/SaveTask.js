import axios from 'axios';
import refreshJWTToken from './RefreshJWTToken';
import API_URLS from '../ApiUrls';
const saveTask = async (tasks) => {
    try {
        const accessToken = await refreshJWTToken();

        if (!accessToken) {
            return;
        }

        const savedTasks = tasks;

        if (!savedTasks || !Array.isArray(savedTasks)) {
            throw new Error('No valid tasks found in localStorage');
        }

        const response = await axios.put(
            API_URLS.UPDATE_USER_TASKS,
            savedTasks,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        if (response.status === 200) {
            // Optionally handle success
            // console.log('Tasks saved successfully:', response.data);
        } else {
            console.error('Error saving tasks:', response.data.message);
        }
    } catch (error) {
        console.error('An error occurred while saving tasks:', error);
    }
};

export default saveTask;
