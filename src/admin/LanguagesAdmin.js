import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import API_URLS from '../ApiUrls';
import { toast } from 'react-toastify';

const LanguagesAdmin = () => {
  const { t } = useTranslation();  
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(API_URLS.GET_MASTER_LANGUAGE);
        setLanguages(response.data);
      } catch (err) {
        setError('Failed to load languages.');
        toast.error('Failed to load languages.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchLanguages();
  }, []);

  const handleLanguageChange = (index, updatedLanguage) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].language = updatedLanguage;
    setLanguages(updatedLanguages);
  };

  const handleAddLanguage = async () => {
    if (newLanguage.trim()) {
      try {
        const response = await axios.post(API_URLS.CREATE_MASTER_LANGUAGE, { language: newLanguage });
        setLanguages([...languages, response.data.language]);
        setNewLanguage('');
        toast.success('Language added successfully!');
      } catch (err) {
        toast.error('Failed to create language.');
      }
    } else {
      toast.error('Language cannot be empty!');
    }
  };

  const handleDeleteLanguage = async (id) => {
    try {
      await axios.delete(API_URLS.DELETE_MASTER_LANGUAGE(id));
      setLanguages(languages.filter((language) => language.id !== id));
      toast.success('Language deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete language.');
    }
  };

  const handleUpdateLanguage = async (id, updatedLanguage) => {
    try {
      await axios.put(API_URLS.UPDATE_MASTER_LANGUAGE(id), { id, language: updatedLanguage });
      toast.success('Language updated successfully!');
    } catch (err) {
      toast.error('Failed to update language.');
    }
  };

  const handleSubmit = async () => {
    try {
      for (const language of languages) {
        await handleUpdateLanguage(language.id, language.language);
      }
      toast.success('All languages updated successfully!');
    } catch (err) {
      toast.error('Failed to update languages.');
    }
  };

  if (isLoading) return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 border-t-4 border-b-4 border-yellow-500 rounded-full animate-spin animation-delay-300"></div>
    </div>
  </div>
  );
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">{t("editLanguages")}</h1>
        
        <div className="flex flex-col space-y-4">
          {languages.map((language, index) => (
            <div key={language.id} className="flex items-center space-x-4">
              <span className="font-semibold">{language.id}:</span>
              <input
                type="text"
                value={language.language}
                onChange={(e) => handleLanguageChange(index, e.target.value)}
                className="flex-grow border rounded p-2"
              />
              <button
                onClick={() => handleDeleteLanguage(language.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                {t("delete")}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <input
            type="text"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            placeholder={t("newlanguage")}
            className="w-full border rounded p-2 mb-4"
          />
          <button
            onClick={handleAddLanguage}
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {t("addLanguage")}
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {t("saveChanges")}
        </button>
      </div>
    </div>
  );
};

export default LanguagesAdmin;
