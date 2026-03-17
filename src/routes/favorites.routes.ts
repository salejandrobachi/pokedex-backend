import express from 'express';
import { FavoritesController } from '../controllers/favorites.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const favoritesController = new FavoritesController();

router.get('/favorites', authMiddleware, favoritesController.getFavorites.bind(favoritesController));
router.post('/favorites', authMiddleware, favoritesController.addFavorite.bind(favoritesController));
router.delete('/favorites/:pokemon_key', authMiddleware, favoritesController.removeFavorite.bind(favoritesController));

export default router;
