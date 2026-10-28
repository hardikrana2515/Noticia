import React from "react";

const TitelHome = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center my-8 px-4 text-center">
      <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100/70 border border-blue-200 px-3 py-1 rounded-full mb-2">
        Community & Personal Notes
      </span>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">
        Discover Public Blogs & Ideas
      </h2>
      <p className="text-gray-500 text-sm mt-1 max-w-md">
        Read thoughts shared by users across the community, or filter to manage your own notes
      </p>
    </div>
  );
};

export default TitelHome;
