import React from "react";

const Alertmessage = ({ message, head, isError = false }) => {
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce duration-300 w-full max-w-md px-4">
      <div
        className={`rounded-2xl p-4 shadow-2xl border flex items-start gap-3 ${
          isError
            ? "bg-red-50 border-red-300 text-red-800"
            : "bg-green-50 border-green-300 text-green-800"
        }`}
      >
        <i
          className={`text-xl mt-0.5 ${
            isError
              ? "fa-solid fa-triangle-exclamation text-red-600"
              : "fa-solid fa-circle-check text-green-600"
          }`}
        ></i>
        <div>
          <h4 className="font-bold text-sm">{head}</h4>
          <p className="text-xs mt-0.5 text-gray-700">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alertmessage;
