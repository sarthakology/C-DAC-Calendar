import axios from 'axios';
import { useEffect, useState } from 'react';
import API_URLS from '../ApiUrls';

const useCountries = () => {
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(API_URLS.GET_MASTER_COUNTRIES);
        setCountryOptions(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return countryOptions;
};

export default useCountries;
