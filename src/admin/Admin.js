import React, { useState } from 'react';
import useProfile from '../profileDataBackend/ProfileData';
import LanguagesAdmin from './LanguagesAdmin';
import CountriesAdmin from './CountriesAdmin';
import TimezonesAdmin from './TimezonesAdmin';
import FormatsAdmin from './FormatsAdmin';
import RoleUpdateAdmin from './RoleUpdateAdmin';
import DeleteUsersAdmin from './DeleteUsersAdmin';
import { useTranslation } from "react-i18next";

export default function Admin() {
  const { t } = useTranslation();  
  const profile = useProfile() || { role: 'Error' };

  const [visibleComponent, setVisibleComponent] = useState(null);

  if (profile.role !== 'admin') {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">{t("noadminaccess")}</h1>
      </div>
    );
  }


  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-center mb-6">
        <h1 className="text-2xl font-bold text-green-500">{t("adminDashboard")}</h1>
      </div>
      <div className="flex justify-center space-x-4 mb-6">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setVisibleComponent('languages')}
        >
          {t("Languages")}
        </button>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setVisibleComponent('countries')}
        >
          {t("Countries")}
        </button>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setVisibleComponent('timezones')}
        >
          {t("Timezones")}
        </button>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setVisibleComponent('formats')}
        >
          {t("Formats")}
        </button>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setVisibleComponent('roleUpdate')}
        >
          {t("Update Role")}
        </button>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setVisibleComponent('deleteUsers')}
        >
          {t("Delete Users")}
        </button>
      </div>
      <div>
        {visibleComponent === 'languages' && <LanguagesAdmin />}
        {visibleComponent === 'countries' && <CountriesAdmin />}
        {visibleComponent === 'timezones' && <TimezonesAdmin />}
        {visibleComponent === 'formats' && <FormatsAdmin />}
        {visibleComponent === 'roleUpdate' && <RoleUpdateAdmin />}
        {visibleComponent === 'deleteUsers' && <DeleteUsersAdmin />}
      </div>
    </div>
  );
}
