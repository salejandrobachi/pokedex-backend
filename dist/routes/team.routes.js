"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const team_controller_1 = require("../controllers/team.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
const teamController = new team_controller_1.TeamController();
router.get('/team', auth_middleware_1.authMiddleware, teamController.getTeam.bind(teamController));
router.post('/team', auth_middleware_1.authMiddleware, teamController.setTeamSlot.bind(teamController));
router.delete('/team/:slot', auth_middleware_1.authMiddleware, teamController.removeFromSlot.bind(teamController));
exports.default = router;
