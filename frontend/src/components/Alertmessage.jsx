import React,{useState} from 'react'

const Alertmessage = ({message,head}) => {
   
  return (
     <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex items-start justify-center m-5 z-50">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md relative border border-blue-200">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-4 border-b pb-2">
          {head}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
            {message}
        </p>
      </div>
    </div>
  )
}

export default Alertmessage