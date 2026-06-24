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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const database_1 = __importDefault(require("../database"));
class FavoritesService {
    getFavorites(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield database_1.default.query('SELECT pokemon_key FROM user_favorites WHERE user_id = $1 ORDER BY created_at ASC', [userId]);
            return rows.map(r => r.pokemon_key);
        });
    }
    addFavorite(userId, pokemonKey) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO user_favorites (user_id, pokemon_key) VALUES ($1, $2)', [userId, pokemonKey]);
        });
    }
    removeFavorite(userId, pokemonKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rowCount } = yield database_1.default.query('DELETE FROM user_favorites WHERE user_id = $1 AND pokemon_key = $2', [userId, pokemonKey]);
            return (rowCount !== null && rowCount !== void 0 ? rowCount : 0) > 0;
        });
    }
}
exports.FavoritesService = FavoritesService;
