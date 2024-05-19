const cloudinary = require('../config/cloudinaryConfig');
const gameModel = require('../models/gameModel');

const createGame = async (req, res, next) => {
  const { idUser, title, description, genre } = req.body;
  const image = req.file;

  if (!idUser || !title || !description || !genre || !image) {
    const err = new Error('All fields are required');
    err.statusCode = 400;
    return next(err);
  }

  try {
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(image.path);
    const imageUrl = uploadResult.secure_url;

    // Create game record
    const gameId = await gameModel.createGame(idUser, title, description, imageUrl, genre);
    res.json({ gameId });
  } catch (error) {
    next(error);
  }
};

const getAllGames = async (req, res, next) => {
  try {
    const games = await gameModel.getAllGames();
    res.json(games);
  } catch (error) {
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
    res.json(game);
  } catch (error) {
    next(error);
  }
};

const updateGame = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, genre } = req.body;
  const image = req.file;

  try {
    let imageUrl = null;
    if (image) {
      // Upload image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(image.path);
      imageUrl = uploadResult.secure_url;
    }

    await gameModel.updateGame(id, title, description, imageUrl, genre);
    res.json({ message: 'Game updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteGame = async (req, res, next) => {
  const { id } = req.params;
  try {
    await gameModel.deleteGame(id);
    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
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
