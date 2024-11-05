import axios from 'axios';
import refreshJWTToken from './RefreshJWTToken';
import API_URLS from '../ApiUrls';

const saveEvent = async (props) => {
    try {
        const accessToken = await refreshJWTToken();

        if (!accessToken) {
            return;
        }

        const savedEvents = props;


        if (!savedEvents || !Array.isArray(savedEvents)) {
            throw new Error('No valid saved events found in localStorage');
        }

        const response = await axios.put(
            API_URLS.UPDATE_USER_EVENTS,
            savedEvents,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        if (response.status === 200) {
            // console.log('Events saved successfully:', response.data);
        } else {
            console.error('Error saving events:', response.data.message);
        }
    } catch (error) {
        console.error('An error occurred while saving events:', error);
    }
};

export default saveEvent;

