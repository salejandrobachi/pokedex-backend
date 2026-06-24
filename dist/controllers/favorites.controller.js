"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesController = void 0;
const favorites_service_1 = require("../services/favorites.service");
const favoritesService = new favorites_service_1.FavoritesService();
class FavoritesController {
    getFavorites(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const favorites = yield favoritesService.getFavorites(req.user.id);
                res.json(favorites);
            }
            catch (error) {
                console.error('Error fetching favorites:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    addFavorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pokemon_key } = req.body;
            if (!pokemon_key) {
                res.status(400).json({ error: 'pokemon_key es requerido' });
                return;
            }
            try {
                yield favoritesService.addFavorite(req.user.id, pokemon_key);
                res.status(201).json({ pokemon_key });
            }
            catch (error) {
                if (error.code === '23505') {
                    res.status(409).json({ error: 'Ya está en favoritos' });
                }
                else {
                    console.error('Error adding favorite:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    }
    removeFavorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pokemon_key } = req.params;
            try {
                const deleted = yield favoritesService.removeFavorite(req.user.id, pokemon_key);
                if (!deleted) {
                    res.status(404).json({ error: 'Favorito no encontrado' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                console.error('Error removing favorite:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.FavoritesController = FavoritesController;
