const express = require('express');
const gameController = require('../controllers/gameController');
const multerMiddleware = require('../middlewares/multerConfig');
const router = express.Router();

router.post('/games', multerMiddleware.single('image'), gameController.createGame);
router.get('/games', gameController.getAllGames);
router.get('/games/:id', gameController.getGameById);
router.put('/games/:id', multerMiddleware.single('image'), gameController.updateGame);
router.delete('/games/:id', gameController.deleteGame);

module.exports = router;
