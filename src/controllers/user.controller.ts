import { Request, Response } from 'express';
import { UserService } from '../services/user.services';
import '../types/express';

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ error: 'username, email y password son requeridos' });
      return;
    }

    try {
      const user = await userService.createUser(username, email, password, role);
      res.status(201).json(user);
    } catch (error: any) {
      if (error.code === '23505') {
        res.status(409).json({ error: 'El email o username ya está en uso' });
      } else {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { username } = req.body;

    if (req.user!.id !== id) {
      res.status(403).json({ error: 'No puedes editar la cuenta de otro usuario' });
      return;
    }

    if (!username) {
      res.status(400).json({ error: 'username es requerido' });
      return;
    }

    try {
      const user = await userService.updateUsername(id, username);
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }
      res.json(user);
    } catch (error: any) {
      if (error.code === '23505') {
        res.status(409).json({ error: 'El username ya está en uso' });
      } else {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (req.user!.id !== id) {
      res.status(403).json({ error: 'No puedes eliminar la cuenta de otro usuario' });
      return;
    }

    try {
      const deleted = await userService.deleteUser(id);
      if (!deleted) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
