import React, { useContext } from 'react';
import GlobalContext from "../context/GlobalContext";

const Loader = () => {
  const { loader } = useContext(GlobalContext);

  if (!loader) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-t-4 border-b-4 border-yellow-500 rounded-full animate-spin animation-delay-300"></div>
      </div>
    </div>
  );
};

export default Loader;
