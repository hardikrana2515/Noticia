import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-blue-400 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
          <i className="ri-edit-2-fill text-blue-600 text-xl animate-bounce"></i>
        </div>
      </div>
      <p className="text-lg text-gray-700 animate-pulse tracking-wide">
        Brewing your thoughts...
      </p>
    </div>
  );
};

export default Loader;
