import axios from 'axios';
import { useEffect, useState } from 'react';
import API_URLS from '../ApiUrls';

const useLanguages = () => {
  const [languageOptions, setLanguageOptions] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(API_URLS.GET_MASTER_LANGUAGE);
        setLanguageOptions(response.data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  return languageOptions;
};

export default useLanguages;
