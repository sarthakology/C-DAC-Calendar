import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import API_URLS from '../ApiUrls';
import { toast } from 'react-toastify';

const CountriesAdmin = () => {
  const { t } = useTranslation();  
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(API_URLS.GET_MASTER_COUNTRIES);
        setCountries(response.data);
        setIsLoading(false);
      } catch (err) {
        toast.error('Failed to load countries.');
        setError('Failed to load countries.');
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = (index, updatedCountry) => {
    const updatedCountries = [...countries];
    updatedCountries[index].country = updatedCountry;
    setCountries(updatedCountries);
  };

  const handleAddCountry = async () => {
    if (newCountry.trim()) {
      try {
        const response = await axios.post(API_URLS.CREATE_MASTER_COUNTRIES, { country: newCountry });
        setCountries([...countries, response.data.country]);
        setNewCountry('');
        toast.success('Country added successfully!');
      } catch (err) {
        toast.error('Failed to create country.');
      }
    } else {
      toast.error('Country cannot be empty!');
    }
  };
  
  const handleDeleteCountry = async (id) => {
    try {
      await axios.delete(API_URLS.DELETE_MASTER_COUNTRIES(id));
      setCountries(countries.filter((country) => country.id !== id));
      toast.success('Country deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete country.');
    }
  };
  
  const handleUpdateCountry = async (id, updatedCountry) => {
    try {
      await axios.put(API_URLS.UPDATE_MASTER_COUNTRIES(id), { id, country: updatedCountry });
      toast.success('Country updated successfully!');
    } catch (err) {
      toast.error('Failed to update country.');
    }
  };
  
  const handleSubmit = async () => {
    try {
      for (const country of countries) {
        await handleUpdateCountry(country.id, country.country);
      }
      toast.success('Countries updated successfully!');
    } catch (err) {
      toast.error('Failed to update countries.');
    }
  };

  if (isLoading) return <div>{t("loading")}</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">{t("editCountries")}</h1>
      <div className="flex flex-col space-y-4">
        {countries.map((country, index) => (
          <div key={country.id} className="flex items-center space-x-4">
            <span className="font-bold">{country.id}:</span>
            <input
              type="text"
              value={country.country}
              onChange={(e) => handleCountryChange(index, e.target.value)}
              className="border rounded p-2"
            />
            <button
              onClick={() => handleDeleteCountry(country.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              {t("delete")}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <input
          type="text"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
          placeholder={t("newcountry")}
          className="border rounded p-2 mb-4"
        />
        <button
          onClick={handleAddCountry}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {t("addCountry")}
        </button>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {t("saveChanges")}
      </button>
    </div>
  );
};

export default CountriesAdmin;
