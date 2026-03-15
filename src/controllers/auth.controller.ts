import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { login, email, password } = req.body;
    const loginValue = login ?? email;

    if (!loginValue || !password) {
      res.status(400).json({ error: 'login (email o username) y password son requeridos' });
      return;
    }

    try {
      const result = await authService.login(loginValue, password);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'INVALID_CREDENTIALS') {
        res.status(401).json({ error: 'Credenciales inválidas' });
      } else {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}