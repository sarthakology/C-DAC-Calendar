import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import API_URLS from '../ApiUrls';
import { toast } from 'react-toastify';

const TimezonesAdmin = () => {
  const { t } = useTranslation();  
  const [timezones, setTimezones] = useState([]);
  const [newTimezone, setNewTimezone] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimezones = async () => {
      try {
        const response = await axios.get(API_URLS.GET_MASTER_TIMEZONE);
        setTimezones(response.data);
      } catch (err) {
        setError(t("Failed to load timezones."));
        toast.error(t("Failed to load timezones."));
      } finally {
        setIsLoading(false);
      }
    };
    fetchTimezones();
  }, [t]);

  const handleTimezoneChange = (index, updatedTimezone) => {
    const updatedTimezones = [...timezones];
    updatedTimezones[index].timezone = updatedTimezone;
    setTimezones(updatedTimezones);
  };

  const handleAddTimezone = async () => {
    if (!newTimezone.trim()) {
      toast.warning(t("Timezone cannot be empty!"));
      return;
    }

    if (timezones.some(tz => tz.timezone === newTimezone)) {
      toast.warning(t("Timezone already exists!"));
      return;
    }

    try {
      setActionLoading(true);
      const response = await axios.post(API_URLS.CREATE_MASTER_TIMEZONE, { timezone: newTimezone });
      setTimezones([...timezones, response.data.timezone]);
      setNewTimezone('');
      toast.success(t("Timezone added successfully!"));
    } catch (err) {
      toast.error(t("Failed to create timezone."));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTimezone = async (id) => {
    try {
      setActionLoading(true);
      await axios.delete(API_URLS.DELETE_MASTER_TIMEZONE(id));
      setTimezones(timezones.filter((timezone) => timezone.id !== id));
      toast.success(t("Timezone deleted successfully!"));
    } catch (err) {
      toast.error(t("Failed to delete timezone."));
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateTimezone = async (id, updatedTimezone) => {
    try {
      setActionLoading(true);
      await axios.put(API_URLS.UPDATE_MASTER_TIMEZONE(id), { id, timezone: updatedTimezone });
      toast.success(t("Timezone updated successfully!"));
    } catch (err) {
      toast.error(t("Failed to update timezone."));
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      for (const timezone of timezones) {
        await handleUpdateTimezone(timezone.id, timezone.timezone);
      }
      toast.success(t("All timezones updated successfully!"));
    } catch (err) {
      toast.error(t("Failed to update timezones."));
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
        <h1 className="text-2xl font-bold mb-4 text-center">{t("editTimezones")}</h1>
        <div className="flex flex-col space-y-4">
          {timezones.map((timezone, index) => (
            <div key={timezone.id} className="flex items-center space-x-4">
              <span className="font-bold">{timezone.id}:</span>
              <input
                type="text"
                value={timezone.timezone}
                onChange={(e) => handleTimezoneChange(index, e.target.value)}
                className="border rounded p-2 w-full"
              />
              <button
                onClick={() => handleDeleteTimezone(timezone.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                disabled={actionLoading}
              >
                {t("delete")}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-center">
          <input
            type="text"
            value={newTimezone}
            onChange={(e) => setNewTimezone(e.target.value)}
            placeholder={t("newtimezone")}
            className="border rounded p-2 mb-4 w-full"
          />
          <button
            onClick={handleAddTimezone}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
            disabled={actionLoading}
          >
            {t("addTimezone")}
          </button>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          disabled={actionLoading}
        >
          {t("saveChanges")}
        </button>
      </div>
    </div>
  );
};

export default TimezonesAdmin;
