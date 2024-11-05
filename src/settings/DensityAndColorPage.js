import React, { useState, useEffect } from 'react';

export default function DensityAndColorPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ? true : false;
  });

  useEffect(() => {
    const theme = isDarkTheme ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div
      className={`h-screen w-screen flex flex-col justify-center items-center transition-colors duration-300 ${
        isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <h1 className="text-5xl font-semibold mb-12">Select Theme</h1>

      <div className="flex items-center text-3xl mb-6">
        <span className="mr-4">Light</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDarkTheme}
            onChange={toggleTheme}
          />
          <div className="w-20 h-10 bg-gray-200 rounded-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-9 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
        </label>
        <span className="ml-4">Dark</span>
      </div>
    </div>
  );
}
