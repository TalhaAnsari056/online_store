import fs from 'fs/promises';
import cloudinary from '../config/cloudinary.js';

const uploadImage = async (req, res) => {
  const files = req.files || [];

  if (!files.length) {
    return res.status(400).json({
      success: false,
      message: 'No image files uploaded',
    });
  }

  try {
    const uploadResults = await Promise.all(
      files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: 'online-store/products',
        })
      )
    );

    res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      count: uploadResults.length,
      images: uploadResults.map((result) => result.secure_url),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Image upload failed',
    });
  } finally {
    await Promise.all(
      files.map(async (file) => {
        if (!file?.path) return;
        try {
          await fs.unlink(file.path);
        } catch {
          // Ignore cleanup errors to preserve original response.
        }
      })
    );
  }
};

export { uploadImage };
