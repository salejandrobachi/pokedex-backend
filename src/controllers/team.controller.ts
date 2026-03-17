import { Request, Response } from 'express';
import { TeamService } from '../services/team.service';

const teamService = new TeamService();

export class TeamController {
  async getTeam(req: Request, res: Response): Promise<void> {
    try {
      const team = await teamService.getTeam(req.user!.id);
      res.json(team);
    } catch (error) {
      console.error('Error fetching team:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async setTeamSlot(req: Request, res: Response): Promise<void> {
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
      await teamService.setTeamSlot(req.user!.id, pokemon_key, slotNum);
      res.status(200).json({ pokemon_key, slot: slotNum });
    } catch (error) {
      console.error('Error setting team slot:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async removeFromSlot(req: Request, res: Response): Promise<void> {
    const slotNum = Number(req.params.slot);

    if (!Number.isInteger(slotNum) || slotNum < 1 || slotNum > 6) {
      res.status(400).json({ error: 'slot debe ser un número entre 1 y 6' });
      return;
    }

    try {
      const deleted = await teamService.removeFromSlot(req.user!.id, slotNum);
      if (!deleted) {
        res.status(404).json({ error: 'El slot está vacío' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error removing from team slot:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
