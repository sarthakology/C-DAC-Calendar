import React, { useEffect, useState } from "react";
import useLanguages from '../mastersApi/Languages';
import useCountries from '../mastersApi/Countries';
import useDateFormats from '../mastersApi/DateFormats';
import useTimezones from '../mastersApi/TimeZones';
import { toast } from 'react-toastify';
import {useTranslation} from "react-i18next";

const SettingsPage = () => {
  const {t, i18n} = useTranslation();  
  const languageOptions = useLanguages();
  const countryOptions = useCountries();
  const dateFormatOptions = useDateFormats();
  const timezoneOptions = useTimezones();

  const [language, setLanguage] = useState(localStorage.getItem('language'));
  const [country, setCountry] = useState(localStorage.getItem('country'));
  const [dateFormat, setDateFormat] = useState(localStorage.getItem('dateFormat'));
  const [primaryTimeZone, setPrimaryTimeZone] = useState(localStorage.getItem('primaryTimeZone'));
  const [secondaryTimeZone, setSecondaryTimeZone] = useState(localStorage.getItem('secondaryTimeZone'));
  
  const [timeFormat, setTimeFormat] = useState("1:00pm");
  const [startWeekOn, setStartWeekOn] = useState("Sunday");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('language', language);
    i18n.changeLanguage(language);


    localStorage.setItem('country', country);
    localStorage.setItem('dateFormat', dateFormat);
    // localStorage.setItem('timeFormat', timeFormat);
    localStorage.setItem('primaryTimeZone', primaryTimeZone);
    localStorage.setItem('secondaryTimeZone', secondaryTimeZone);
    // localStorage.setItem('startWeekOn', startWeekOn);
    toast.success("Settings have been saved successfully!");
  }; 
  

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">{t("languageandRegion")}</h1>
      <form onSubmit={handleSubmit}>

        {/* Language Selection */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">{t("language")}</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">{t("selectalanguage")}</option>
            {languageOptions.map((option) => (
              <option key={option.id} value={option.language}>
                {option.language}
              </option>
            ))}
          </select>
        </div>

        {/* Country Selection */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">{t("country")}</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">{t("selectacountry")}</option>
            {countryOptions.map((option) => (
              <option key={option.id} value={option.country}>
                {option.country}
              </option>
            ))}
          </select>
        </div>

        {/* Date Format */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">{t("dateFormat")}</label>
          <select
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">{t("selectadateformat")}</option>
            {dateFormatOptions.map((option) => (
              <option key={option.id} value={option.format}>
                {option.format}
              </option>
            ))}
          </select>
        </div>

        {/* Time Format */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">{t("timeFormat")}</label>
          <select
            value={timeFormat}
            onChange={(e) => setTimeFormat(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option>1:00pm</option>
            <option>13:00</option>
          </select>
        </div>

        {/* Primary Time Zone */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-6">{t("timeZone")}</h1>
          <label className="block text-lg font-medium mb-2">{t("primaryTimeZone")}</label>
          <select
            value={primaryTimeZone}
            onChange={(e) => setPrimaryTimeZone(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">{t("selectatimezone")}</option>
            {timezoneOptions.map((option) => (
              <option key={option.id} value={option.timezone}>
                {option.timezone}
              </option>
            ))}
          </select>
        </div>

        {/* Secondary Time Zone */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">{t("secondaryTimeZone")}</label>
          <select
            value={secondaryTimeZone}
            onChange={(e) => setSecondaryTimeZone(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">{t("notselected")}</option>
            {timezoneOptions.map((option) => (
              <option key={option.id} value={option.timezone}>
                {option.timezone}
              </option>
            ))}
          </select>
        </div>

        {/* Start Week On */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">{t("startWeekOn")}</label>
          <select
            value={startWeekOn}
            onChange={(e) => setStartWeekOn(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option>Sunday</option>
            <option>Monday</option>
            <option>Saturday</option>
          </select>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700"
          >
            {t("saveChanges")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
