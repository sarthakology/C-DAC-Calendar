import axios from 'axios';
import refreshJWTToken from './RefreshJWTToken';
import API_URLS from '../ApiUrls';
const DeleteEvent = async (props) => {
  try {

    const accessToken = await refreshJWTToken();

    if (!accessToken) {
      console.error('Failed to refresh JWT token');
      return;
    }


    const response = await axios.delete(
      API_URLS.DELETE_EVENT(props),
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log('Event deleted successfully:', response.data);
    } else {
      console.error('Error deleting event:', response.data.message);
    }
  } catch (error) {
    console.error('An error occurred while deleting the event:', error);
  }

  return null;
};

export default DeleteEvent;
