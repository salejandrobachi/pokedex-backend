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
exports.TeamService = void 0;
const database_1 = __importDefault(require("../database"));
class TeamService {
    getTeam(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield database_1.default.query(`SELECT s.slot, t.pokemon_key
       FROM generate_series(1, 6) AS s(slot)
       LEFT JOIN user_team t ON t.user_id = $1 AND t.slot = s.slot
       ORDER BY s.slot`, [userId]);
            return rows;
        });
    }
    setTeamSlot(userId, pokemonKey, slot) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.default.connect();
            try {
                yield client.query('BEGIN');
                // Remove pokemon from its current slot (if already in the team)
                yield client.query('DELETE FROM user_team WHERE user_id = $1 AND pokemon_key = $2', [userId, pokemonKey]);
                // Upsert into target slot (replaces whatever was there)
                yield client.query(`INSERT INTO user_team (user_id, pokemon_key, slot) VALUES ($1, $2, $3)
         ON CONFLICT (user_id, slot) DO UPDATE SET pokemon_key = EXCLUDED.pokemon_key`, [userId, pokemonKey, slot]);
                yield client.query('COMMIT');
            }
            catch (error) {
                yield client.query('ROLLBACK');
                throw error;
            }
            finally {
                client.release();
            }
        });
    }
    removeFromSlot(userId, slot) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rowCount } = yield database_1.default.query('DELETE FROM user_team WHERE user_id = $1 AND slot = $2', [userId, slot]);
            return (rowCount !== null && rowCount !== void 0 ? rowCount : 0) > 0;
        });
    }
}
exports.TeamService = TeamService;
