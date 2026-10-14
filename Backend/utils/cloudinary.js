const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

const cloudinaryUploadImg = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, { resource_type: "image" });
  return { url: result.secure_url, asset_id: result.asset_id, public_id: result.public_id };
};

const cloudinaryDeleteImg = async (publicId) => cloudinary.uploader.destroy(publicId);

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
