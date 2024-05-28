const bcrypt = require('bcrypt');
const userModel = require('../models/authModel');

const register = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    const err = new Error('Username and password are required');
    err.statusCode = 400;
    return next(err);
  }

  try {
    const user = await userModel.findUserByUsername(username);
    if(user){
    const err = new Error('Username is already being used');
    err.statusCode = 400;
    throw err;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await userModel.createUser(username, hashedPassword);
    res.status(201).json({ status: 'success', data: { userId } });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    const err = new Error('Username and password are required');
    err.statusCode = 400;
    return next(err);
  }

  try {
    const user = await userModel.findUserByUsername(username);
    if (!user) {
      const err = new Error('Invalid username or password');
      err.statusCode = 401;
      throw err;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const err = new Error('Invalid username or password');
      err.statusCode = 401;
      throw err;
    }

    res.status(200).json({ status: 'success', data: { userId: user.id } });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

module.exports = {
  register,
  login,
};
