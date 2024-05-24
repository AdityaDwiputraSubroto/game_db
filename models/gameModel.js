const db = require('../config/db');

const createGame = async (idUser, title, description, imageUrl, publicId, genre) => {
  try {
    const [result] = await db.execute(
      'INSERT INTO games (idUser, title, description, imageUrl, publicId, genre) VALUES (?, ?, ?, ?, ?, ?)', 
      [idUser, title, description, imageUrl, publicId, genre]
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

const updateGame = async (id, title, description, imageUrl, genre, publicId) => {
  try {
    const [result] = await db.execute(
      'UPDATE games SET title = ?, description = ?, imageUrl = ?, genre = ?, publicId = ? WHERE id = ?', 
      [title, description, imageUrl, genre, publicId, id]
    );
    
    return result;
  } catch (error) {
    const err = new Error('Error update game: ' + error.message);
    err.statusCode = 500;
    throw err;
  }
};

const getGamePublicIdById = async (id) => {
  try {
    const [rows] = await db.execute('SELECT publicId FROM games WHERE id = ?', [id]);
    return rows[0]?.publicId;
  } catch (error) {
    const err = new Error('Error fetching game public ID: ' + error.message);
    err.statusCode = 500;
    throw err;
  }
};


const deleteGame = async (id) => {
  try {
    const [result] = await db.execute('DELETE FROM games WHERE id = ?', [id]);
    return result;
  } catch (error) {
    const err = new Error('Error delete game: ' + error.message);
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
  getGamePublicIdById
};
