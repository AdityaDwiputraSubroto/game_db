const cloudinary = require('../config/cloudinaryConfig');
const gameModel = require('../models/gameModel');

const createGame = async (req, res, next) => {
  const { idUser, title, description, genre } = req.body;
  const image = req.file;

  if (!idUser || !title || !description || !genre) {
    const err = new Error('All fields are required');
    err.statusCode = 400;
    return next(err);
  }

  try {
    let imageUrl = null;
    let publicId = null;
   
    if(image){
      imageUrl = image.path;
      publicId = image.filename;
    }
    
    console.log('cloudinary upload result : '+publicId);
    // Insert game 
    const gameId = await gameModel.createGame(idUser, title, description, imageUrl, publicId, genre);
    res.status(201).json({ status: 'success', data: { gameId } });
  } catch (error) {
    error.statusCode = error.statusCode || 500; 
    next(error);
  }
};

const getAllGames = async (req, res, next) => {
  try {
    const games = await gameModel.getAllGames();
    res.status(200).json({ status: 'success', data: games });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

const getGameById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const game = await gameModel.getGameById(id);
    if (!game) {
      const err = new Error('Game not found');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ status: 'success', data: game });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

const updateGame = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, genre } = req.body;
  const image = req.file;

  try {
    let imageUrl = null;
    let publicId = null;
    
    if (image) {
      //delete image if update image
      const oldPublicId = await gameModel.getGamePublicIdById(id);
      if (oldPublicId) {
          // Delete the image from Cloudinary using the publicId
          await cloudinary.uploader.destroy(oldPublicId);
      }
      // Upload image to Cloudinary
      imageUrl = image.path;
      publicId = image.filename;
    }

    result = await gameModel.updateGame(id, title, description, imageUrl, genre, publicId);
    if (result.affectedRows === 0) {
      const err = new Error('Error update game: Game not found');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ status: 'success', message: 'Game updated successfully' });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

const deleteGame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const publicId = await gameModel.getGamePublicIdById(id);
    if (publicId) {
      // Delete the image from Cloudinary using the publicId
      await cloudinary.uploader.destroy(publicId);
    }

    result = await gameModel.deleteGame(id);
    if (result.affectedRows === 0) {
      const err = new Error('Error delete game: Game not found');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ status: 'success', message: 'Game deleted successfully' });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

module.exports = {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
};
