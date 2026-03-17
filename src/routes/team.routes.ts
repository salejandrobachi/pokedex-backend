import express from 'express';
import { TeamController } from '../controllers/team.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const teamController = new TeamController();

router.get('/team', authMiddleware, teamController.getTeam.bind(teamController));
router.post('/team', authMiddleware, teamController.setTeamSlot.bind(teamController));
router.delete('/team/:slot', authMiddleware, teamController.removeFromSlot.bind(teamController));

export default router;
