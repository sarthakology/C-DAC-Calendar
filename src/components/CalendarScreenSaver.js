import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import useProfile from "../profileDataBackend/ProfileData";
import {useTranslation} from "react-i18next";

const CalendarScreenSaver = () => {
  const {t} = useTranslation();  
  const profile = useProfile() || {
    name: "Error",
    profilePicture: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
  };
  const navigate = useNavigate();
  const [time, setTime] = useState(dayjs());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const country = localStorage.getItem('country') || '';
  const dateFormat = localStorage.getItem('dateFormat') || '';

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const returnHome = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <h2 className="text-[15rem] font-mono leading-none">
          {time.format('h:mm:ss')}
          {time.format('A')}
        </h2>
      </div>

      <div className="absolute bottom-8 left-8">
        <h1 className="text-xl">
          {time.format('dddd')}
        </h1>
      </div>
      <div className="absolute bottom-8 right-8">
        <h1 className="text-xl">
          {time.format(dateFormat)}
        </h1>
      </div>

      {/* Country display with location icon */}
      <div className="absolute top-8 left-8 flex items-center space-x-2">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 2c-2.53 0-5.07 1.122-6.36 3.046-.216.308-.52.643-.64 1.02C5 19.627 6.373 21 8.004 21h7.992C17.627 21 19 19.627 19 18.064c-.12-.377-.424-.712-.64-1.02C17.07 14.122 14.53 13 12 13z" />
        </svg>
        <span className="text-lg font-semibold">
          {country || 'Country not selected'}
        </span>
      </div>

      {!isFullscreen && (
        <div className="absolute top-8 right-8 flex space-x-4">
            <button
            onClick={toggleFullScreen}
                className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-300 transition duration-300"
            >
            {t("goFullScreen")}
            </button>
            <button
            onClick={returnHome}
                className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-300 transition duration-300"
            >
            {t("home")}
            </button>
        </div>
        )}

      {isFullscreen && (
        <div className="absolute top-8 right-8 text-right flex">
          <h1 className="text-2xl font-bold text-gray-200 mb-2">
          {t("hi")}, {profile.name}!
          </h1>
          <img 
            src={profile.profilePicture} 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default CalendarScreenSaver;
