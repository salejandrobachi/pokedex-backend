import { Request, Response } from 'express';
import { FavoritesService } from '../services/favorites.service';

const favoritesService = new FavoritesService();

export class FavoritesController {
  async getFavorites(req: Request, res: Response): Promise<void> {
    try {
      const favorites = await favoritesService.getFavorites(req.user!.id);
      res.json(favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async addFavorite(req: Request, res: Response): Promise<void> {
    const { pokemon_key } = req.body;

    if (!pokemon_key) {
      res.status(400).json({ error: 'pokemon_key es requerido' });
      return;
    }

    try {
      await favoritesService.addFavorite(req.user!.id, pokemon_key);
      res.status(201).json({ pokemon_key });
    } catch (error: any) {
      if (error.code === '23505') {
        res.status(409).json({ error: 'Ya está en favoritos' });
      } else {
        console.error('Error adding favorite:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async removeFavorite(req: Request, res: Response): Promise<void> {
    const { pokemon_key } = req.params;

    try {
      const deleted = await favoritesService.removeFavorite(req.user!.id, pokemon_key);
      if (!deleted) {
        res.status(404).json({ error: 'Favorito no encontrado' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error removing favorite:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
