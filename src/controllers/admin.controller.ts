import { Request, Response } from 'express';
import { UserService } from '../services/user.services';
import '../types/express';

const userService = new UserService();

export class AdminController {
  async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error listing users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { username, email, role } = req.body;

    if (!username && !email && !role) {
      res.status(400).json({ error: 'Debes proporcionar al menos username, email o role' });
      return;
    }

    try {
      const user = await userService.adminUpdateUser(id, { username, email, role });
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }
      res.json(user);
    } catch (error: any) {
      if (error.code === '23505') {
        res.status(409).json({ error: 'El username o email ya está en uso por otro usuario' });
      } else {
        console.error('Error updating user (admin):', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}
