"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favorites_controller_1 = require("../controllers/favorites.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
const favoritesController = new favorites_controller_1.FavoritesController();
router.get('/favorites', auth_middleware_1.authMiddleware, favoritesController.getFavorites.bind(favoritesController));
router.post('/favorites', auth_middleware_1.authMiddleware, favoritesController.addFavorite.bind(favoritesController));
router.delete('/favorites/:pokemon_key', auth_middleware_1.authMiddleware, favoritesController.removeFavorite.bind(favoritesController));
exports.default = router;
