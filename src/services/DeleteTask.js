import axios from 'axios';
import refreshJWTToken from './RefreshJWTToken';
import API_URLS from '../ApiUrls';
const DeleteTask = async (props) => {
  try {

    const accessToken = await refreshJWTToken();

    if (!accessToken) {
      console.error('Failed to refresh JWT token');
      return;
    }


    const response = await axios.delete(
      API_URLS.DELETE_TASK(props),
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log('Task deleted successfully:', response.data);
    } else {
      console.error('Error deleting Task:', response.data.message);
    }
  } catch (error) {
    console.error('An error occurred while deleting the Task:', error);
  }

  return null;
};

export default DeleteTask;
