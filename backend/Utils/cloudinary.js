import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dchfzng55",
  api_key: process.env.CLOUDINARY_API_KEY || "276223172749861",
  api_secret: process.env.CLOUDINARY_API_SECRET || "bx3hQqhOyX_7-bN758tPv4N74XI",
});

/**
 * Uploads a local file to Cloudinary and deletes the temporary local file.
 * @param {string} localFilePath - Path of the file on local disk
 * @param {string} folder - Folder name in Cloudinary (e.g., 'noticia/blogs', 'noticia/profiles')
 * @returns {Promise<object|null>} Cloudinary upload response or null on failure
 */
export const uploadOnCloudinary = async (localFilePath, folder = "noticia") => {
  try {
    if (!localFilePath) return null;

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder,
      resource_type: "auto",
    });

    // File uploaded successfully, remove local copy safely
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;
  } catch (error) {
    // Remove local file if upload failed
    if (fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
      } catch (unlinkErr) {
        console.error("Error removing local temporary file:", unlinkErr);
      }
    }
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

/**
 * Deletes an image from Cloudinary using its public_id or secure URL.
 * @param {string} publicIdOrUrl - Cloudinary public_id or image URL
 */
export const deleteFromCloudinary = async (publicIdOrUrl) => {
  try {
    if (!publicIdOrUrl) return null;

    let publicId = publicIdOrUrl;
    // If a full URL is passed, extract the public_id
    if (publicIdOrUrl.startsWith("http")) {
      const parts = publicIdOrUrl.split("/");
      const uploadIndex = parts.indexOf("upload");
      if (uploadIndex !== -1) {
        // Skip version if present (e.g. v12345678)
        let publicIdParts = parts.slice(uploadIndex + 1);
        if (publicIdParts[0] && publicIdParts[0].startsWith("v") && !isNaN(publicIdParts[0].substring(1))) {
          publicIdParts = publicIdParts.slice(1);
        }
        const fullIdWithExt = publicIdParts.join("/");
        publicId = fullIdWithExt.substring(0, fullIdWithExt.lastIndexOf(".")) || fullIdWithExt;
      }
    }

    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return null;
  }
};

export default cloudinary;

