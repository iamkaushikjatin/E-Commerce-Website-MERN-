import { v2 as cloudinary } from "cloudinary";
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});


const storage = new multer.memoryStorage(); 

async function imageUploadUtils(file) {
  const result = await cloudinary.uploader
    .upload(file, { resource_type:'auto' })
    .catch((error) => {
      console.log(error);
    });

    return result;
}

const upload = multer({storage});

export {upload, imageUploadUtils};
