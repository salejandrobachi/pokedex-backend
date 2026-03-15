import pool from '../database';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

export class UserService {
  async createUser(username: string, email: string, password: string, role: string = 'user'): Promise<Omit<User, 'password_hash'>> {
    const password_hash = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, created_at, role
    `;
    const { rows } = await pool.query<Omit<User, 'password_hash'>>(query, [username, email, password_hash, role]);
    return rows[0];
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query<User>(query, [email]);
    return rows[0] || null;
  }

  async getUserById(id: string): Promise<Omit<User, 'password_hash'> | null> {
    const query = 'SELECT id, username, email, created_at, role FROM users WHERE id = $1';
    const { rows } = await pool.query<Omit<User, 'password_hash'>>(query, [id]);
    return rows[0] || null;
  }
}
