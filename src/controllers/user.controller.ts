import { Request, Response } from 'express';
import { UserService } from '../services/user.services';

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
}
