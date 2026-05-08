import fs from 'fs/promises';
import cloudinary from '../config/cloudinary.js';

const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file uploaded' });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'online-store/products',
    });

    await fs.unlink(req.file.path);

    res.status(200).json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    if (req.file?.path) {
      try {
        await fs.unlink(req.file.path);
      } catch {
        // Ignore cleanup errors to preserve original upload error.
      }
    }

    res.status(500).json({
      message: error.message || 'Image upload failed',
    });
  }
};

export { uploadImage };
