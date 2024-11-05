import axios from 'axios';
import { useEffect, useState } from 'react';
import API_URLS from '../ApiUrls';

const useDateFormats = () => {
  const [dateFormatOptions, setDateFormatOptions] = useState([]);

  useEffect(() => {
    const fetchDateFormats = async () => {
      try {
        const response = await axios.get(API_URLS.GET_MASTER_DATEFORMAT);
        setDateFormatOptions(response.data);
      } catch (error) {
        console.error('Error fetching date formats:', error);
      }
    };

    fetchDateFormats();
  }, []);

  return dateFormatOptions;
};

export default useDateFormats;
