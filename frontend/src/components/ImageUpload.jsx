import React, { useState } from 'react'
import userContext from '../context/UserContext/userContext'
import { useContext } from 'react'

const ImageUpload = () => {
    const [img, setImg] = useState(null)
    const { Profilepic } = useContext(userContext)

    const handleImageUpload = (e) => {
        e.preventDefault();
        if (!img) {
            console.error("No image selected!");
            return;
        }
        const formData = new FormData();
        formData.append('profilePic', img);
        // console.log("Form Data:", img);
        Profilepic(formData)
    }


    return (
        <div className="w-full flex flex-col items-center justify-center mt-6">
            <form
                onSubmit={handleImageUpload}
                className="w-full max-w-sm bg-blue-50  rounded-xl p-6 shadow-sm space-y-4"
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                    className="block w-full text-sm text-blue-900  file:mr-4 file:py-2 file:px-4  file:rounded-lg file:border-0 file:text-sm file:font-semibold
                 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all duration-300"
                >
                    Upload Image
                </button>
            </form>
        </div>

    )
}

export default ImageUpload