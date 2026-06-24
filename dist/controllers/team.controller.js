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
exports.TeamController = void 0;
const team_service_1 = require("../services/team.service");
const teamService = new team_service_1.TeamService();
class TeamController {
    getTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const team = yield teamService.getTeam(req.user.id);
                res.json(team);
            }
            catch (error) {
                console.error('Error fetching team:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    setTeamSlot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pokemon_key, slot } = req.body;
            if (!pokemon_key || slot === undefined) {
                res.status(400).json({ error: 'pokemon_key y slot son requeridos' });
                return;
            }
            const slotNum = Number(slot);
            if (!Number.isInteger(slotNum) || slotNum < 1 || slotNum > 6) {
                res.status(400).json({ error: 'slot debe ser un número entre 1 y 6' });
                return;
            }
            try {
                yield teamService.setTeamSlot(req.user.id, pokemon_key, slotNum);
                res.status(200).json({ pokemon_key, slot: slotNum });
            }
            catch (error) {
                console.error('Error setting team slot:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    removeFromSlot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const slotNum = Number(req.params.slot);
            if (!Number.isInteger(slotNum) || slotNum < 1 || slotNum > 6) {
                res.status(400).json({ error: 'slot debe ser un número entre 1 y 6' });
                return;
            }
            try {
                const deleted = yield teamService.removeFromSlot(req.user.id, slotNum);
                if (!deleted) {
                    res.status(404).json({ error: 'El slot está vacío' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                console.error('Error removing from team slot:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.TeamController = TeamController;
