const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const gameRoutes = require('./routes/gameRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cloudinary = require('./config/cloudinaryConfig');

const app = express();
app.use(bodyParser.json());

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'game_images', // Optional - folder to store images
    allowedFormats: ['jpg', 'jpeg', 'png'],
  },
});

// Multer middleware with Cloudinary storage
const multerMiddleware = multer({ storage: storage });

app.use(multerMiddleware.single('image')); // Handle file uploads

// Define routes
app.use(gameRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
