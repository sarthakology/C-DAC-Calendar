import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import API_URLS from '../ApiUrls';
import { toast } from 'react-toastify';

const FormatsAdmin = () => {
  const { t } = useTranslation();  
  const [formats, setFormats] = useState([]);
  const [newFormat, setNewFormat] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormats = async () => {
      try {
        const response = await axios.get(API_URLS.GET_MASTER_DATEFORMAT);
        setFormats(response.data);
      } catch (err) {
        setError(t("Failed to load formats."));
        toast.error(t("Failed to load formats."));
      } finally {
        setIsLoading(false);
      }
    };
    fetchFormats();
  }, [t]);

  const handleFormatChange = (index, updatedFormat) => {
    const updatedFormats = [...formats];
    updatedFormats[index].format = updatedFormat;
    setFormats(updatedFormats);
  };

  const handleAddFormat = async () => {
    if (!newFormat.trim()) {
      toast.warning(t("Format cannot be empty!"));
      return;
    }

    if (formats.some(f => f.format === newFormat)) {
      toast.warning(t("Format already exists!"));
      return;
    }

    try {
      const response = await axios.post(API_URLS.CREATE_MASTER_DATEFORMAT, { format: newFormat });
      setFormats([...formats, response.data.format]);
      setNewFormat('');
      toast.success(t("Format added successfully!"));
    } catch (err) {
      toast.error(t("Failed to create format."));
    }
  };

  const handleDeleteFormat = async (id) => {
    try {
      await axios.delete(API_URLS.DELETE_MASTER_DATEFORMAT(id));
      setFormats(formats.filter((format) => format.id !== id));
      toast.success(t("Format deleted successfully!"));
    } catch (err) {
      toast.error(t("Failed to delete format."));
    }
  };

  const handleUpdateFormat = async (id, updatedFormat) => {
    try {
      await axios.put(API_URLS.UPDATE_MASTER_DATEFORMAT(id), { id, format: updatedFormat });
      toast.success(t("Format updated successfully!"));
    } catch (err) {
      toast.error(t("Failed to update format."));
    }
  };

  const handleSubmit = async () => {
    try {
      for (const format of formats) {
        await handleUpdateFormat(format.id, format.format);
      }
      toast.success(t("All formats updated successfully!"));
    } catch (err) {
      toast.error(t("Failed to update formats."));
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
        <h1 className="text-2xl font-bold mb-4 text-center">{t("editFormats")}</h1>
        <div className="flex flex-col space-y-4">
          {formats.map((format, index) => (
            <div key={format.id} className="flex items-center space-x-4">
              <span className="font-bold">{format.id}:</span>
              <input
                type="text"
                value={format.format}
                onChange={(e) => handleFormatChange(index, e.target.value)}
                className="border rounded p-2 w-full"
              />
              <button
                onClick={() => handleDeleteFormat(format.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                disabled={isLoading}
              >
                {t("delete")}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-center">
          <input
            type="text"
            value={newFormat}
            onChange={(e) => setNewFormat(e.target.value)}
            placeholder={t("newformat")}
            className="border rounded p-2 mb-4 w-full"
          />
          <button
            onClick={handleAddFormat}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
            disabled={isLoading}
          >
            {t("addFormat")}
          </button>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          disabled={isLoading}
        >
          {t("saveChanges")}
        </button>
      </div>
    </div>
  );
};

export default FormatsAdmin;
