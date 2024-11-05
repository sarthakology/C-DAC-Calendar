import axios from 'axios';
import { useEffect, useState } from 'react';
import API_URLS from '../ApiUrls';
const useTimezones = () => {
  const [timezoneOptions, setTimezoneOptions] = useState([]);

  useEffect(() => {
    const fetchTimezones = async () => {
      try {
        const response = await axios.get(API_URLS.GET_MASTER_TIMEZONE);
        setTimezoneOptions(response.data);
      } catch (error) {
        console.error('Error fetching timezones:', error);
      }
    };

    fetchTimezones();
  }, []);

  return timezoneOptions;
};

export default useTimezones;
