import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import useProfile from "../profileDataBackend/ProfileData";
import {useTranslation} from "react-i18next";

export default function CalendarHeader() {
  const {t} = useTranslation();  
  const { monthIndex, setMonthIndex, showSidebar, setShowSidebar, calendarEventToggle, setCalendarEventToggle } = useContext(GlobalContext);
  const [helpDropdown, setHelpDropdown] = useState(false);
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const navigate = useNavigate();

  const profile = useProfile() || {
    email: "Error",
    gender: "Error",
    role: "Error",
    name: "Error",
    phno: 0,
    profilePicture: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
  };

  const [profilePicture, setProfilePicture] = useState(profile.profilePicture);

  useEffect(() => {
    setProfilePicture(profile.profilePicture);
  }, [profile.profilePicture]);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset() {
    setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month());
  }

  function handleSidebar() {
    setShowSidebar(!showSidebar);
  }

  function toggleHelpDropdown() {
    setHelpDropdown(!helpDropdown);
    setSettingsDropdown(false);
  }

  function toggleSettingsDropdown() {
    setSettingsDropdown(!settingsDropdown);
    setHelpDropdown(false);
  }

  return (
    <header className="px-4 py-2 flex items-center border-b bg-custom text-custom">
      <button onClick={handleSidebar}>
        <span className="material-icons-outlined cursor-pointer mx-2">
          menu
        </span>
      </button>
      <Link to="/" className="flex items-center px-2">
        <img src='https://upload.wikimedia.org/wikipedia/en/d/db/C-DAC_LogoTransp.png' alt="calendar" className="mr-2 h-12" />
      </Link>
      <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
      {t("today")}
      </button>
      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer mx-2">
          chevron_left
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer mx-2">
          chevron_right
        </span>
      </button>
      <h2 className="ml-4 text-xl font-bold text-custom">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>

      {profile.role === "admin" && (
        <button 
        onClick={() => navigate('/admin')}
        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-6 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-200 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 ml-4">
        {t("admin")}
        </button>
      )}
      <button 
        onClick={() => navigate('/screensaver')}
        className="border rounded py-2 px-6 ml-4 bg-custom text-custom">
        {t("screenSaver")}
      </button>

      <div className="ml-auto flex relative">
        <button onClick={toggleHelpDropdown}>
          <span className="material-icons-outlined cursor-pointer mx-2 text-custom">
            help
          </span>
        </button>
        <button onClick={toggleSettingsDropdown}>
          <span className="material-icons-outlined cursor-pointer mx-2 text-custom">
            settings
          </span>
        </button>

        {helpDropdown && (
          <div className="absolute right-16 top-12 bg-white border rounded shadow-lg p-2 w-64">
            <ul>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">
                <Link to="https://cdac.in/index.aspx?id=help" className="block w-full h-full">{t("help")}</Link>
              </li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">
                <Link to="/updates" className="block w-full h-full">{t("updates")}</Link>
              </li>
              <li><hr className="border-t border-gray-300 my-2" /></li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">
                <Link to="https://cdac.in/index.aspx?id=reach_us" className="block w-full h-full">{t("sendfeedbacktoCDAC")}</Link>
              </li>
            </ul>
          </div>
        )}

        {settingsDropdown && (
          <div className="absolute right-5 top-12 bg-white border rounded shadow-lg p-2 w-64">
            <ul>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">
                <Link to="/setting" className="block w-full h-full">{t("settings")}</Link>
              </li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">
                <Link to="/trash" className="block w-full h-full">{t("trash")}</Link>
              </li>
              <li><hr className="border-t border-gray-300 my-2" /></li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">
                <Link to="/Get-add-ons" className="block w-full h-full">{t("getaddons")}</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex p-1 relative items-center w-30">
        <div className="w-full flex justify-center">
          <button 
            onClick={() => setCalendarEventToggle(true)}
            className={`${calendarEventToggle ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} h-10 py-2 px-4 rounded-l-xl w-full`}>
            <span className="material-icons-outlined cursor-pointer">
              calendar_month
            </span>
          </button>
        </div>
        <div className="w-full flex justify-center">
          <button 
            className={`${calendarEventToggle ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-blue-500 text-white"} h-10 py-2 px-4 rounded-r-xl w-full`}
            onClick={() => setCalendarEventToggle(false)}>
            <span className="material-icons-outlined cursor-pointer">
              task_alt
            </span>
          </button>
        </div>
        <div className="w-full flex justify-center px-2">
          <button onClick={() => navigate('/profile')}>
            <img src={profilePicture} alt="calendar" className="w-12 h-12 rounded-full border-2 border-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
}
