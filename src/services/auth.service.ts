import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserService } from './user.services';

const userService = new UserService();

export class AuthService {
  async login(login: string, password: string): Promise<{ token: string; user: object }> {
    const user = login.includes('@')
      ? await userService.getUserByEmail(login)
      : await userService.getUserByUsername(login);

    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }
}