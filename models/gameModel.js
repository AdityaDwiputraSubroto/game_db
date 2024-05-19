const cloudinary = require('../config/cloudinaryConfig');
const db = require('../config/db');

const createGame = async (idUser, title, description, imageUrl, genre) => {
  try {
    const [result] = await db.execute(
      'INSERT INTO games (idUser, title, description, imageUrl, genre) VALUES (?, ?, ?, ?, ?)', 
      [idUser, title, description, imageUrl, genre]
    );
    return result.insertId;
  } catch (error) {
    const err = new Error('Error creating game: ' + error.message);
    err.statusCode = 500;
    throw err;
  }
};

const getAllGames = async () => {
  try {
    const [rows] = await db.execute('SELECT * FROM games');
    return rows;
  } catch (error) {
    const err = new Error('Error fetching games: ' + error.message);
    err.statusCode = 500;
    throw err;
  }
};

const getGameById = async (id) => {
  try {
    const [rows] = await db.execute('SELECT * FROM games WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    const err = new Error('Error fetching game: ' + error.message);
    err.statusCode = 500;
    throw err;
  }
};

const updateGame = async (id, title, description, imageUrl, genre) => {
  try {
    await db.execute(
      'UPDATE games SET title = ?, description = ?, imageUrl = ?, genre = ? WHERE id = ?', 
      [title, description, imageUrl, genre, id]
    );
  } catch (error) {
    const err = new Error('Error updating game: ' + error.message);
    err.statusCode = 500;
    throw err;
  }
};

const deleteGame = async (id) => {
  try {
    await db.execute('DELETE FROM games WHERE id = ?', [id]);
  } catch (error) {
    const err = new Error('Error deleting game: ' + error.message);
    err.statusCode = 500;
    throw err;
  }
};

const getGamesByUserId = async (idUser) => {
  try {
    const [rows] = await db.execute('SELECT * FROM games WHERE idUser = ?', [idUser]);
    return rows;
  } catch (error) {
    const err = new Error('Error fetching user games: ' + error.message);
    err.statusCode = 500;
    throw err;
  }
};

module.exports = {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
  getGamesByUserId,
};
