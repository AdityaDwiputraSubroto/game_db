const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'game_images',
    allowedFormats: ['jpg', 'jpeg', 'png'],
  },
});

const multerMiddleware = multer({ storage: storage });

module.exports = multerMiddleware;
