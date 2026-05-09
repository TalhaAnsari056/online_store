import fs from 'fs';
import path from 'path';
import multer from 'multer';

const uploadDir = path.resolve('tmp/uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const sanitizedName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${uniqueSuffix}-${sanitizedName}`);
  },
});

const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
    return;
  }

  cb(new Error('Only JPG, JPEG, PNG, and WEBP images are allowed'), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    files: 5,
  },
});

export default upload;
